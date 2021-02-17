import socketHandler from '../helpers/socketHandler';

import { 
	NEW_MESSAGE, 
	USER_JOINED
} from '../constants/socketEvents';

import { 
	ADD_MESSAGE, 
	ADD_OTHER_USER, 
	JOIN_ROOM, 
	INIT_USER, 
	UPDATE_STATUS, 
	UPDATE_MSG_INPUT 
} from './actionTypes';

import { 
	OK, 
	LOADING, 
	SENDING_MSG, 
	JOIN_ROOM_ERR, 
	SEND_MSG_ERR 
} from '../constants/statusTypes';

function updateStatus(dispatch, status) {
	dispatch({type: UPDATE_STATUS, payload: {status}});
}

async function joinRoom(socket_data) {
	try {
		const generatedUser = 'user_' + Math.random().toString(36).substr(2, 9);
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({user: generatedUser, room: socket_data.room})
		};	

		const response = await fetch('http://localhost:8000/joinRoom', requestOptions);
		return await response.json();
	} catch (ex) {
		console.error(`Error joining room\n\n${ex}`);
	}
}

function handleRoomEvent(dispatch, e) {
	const data = e.data;
	switch (e.event) {
		case NEW_MESSAGE:
			dispatch({
				type: ADD_MESSAGE, 
				payload: {user: data.user, room: data.room, message: data.message}});
			break;
		case USER_JOINED:
			dispatch({type: ADD_OTHER_USER, payload: {user: data.user}});
			break;
		default:
			console.log(`Socket event ${e.event} was triggered`);
	}
}

export function connectToRoom(dispatch) {
	try {
		updateStatus(dispatch, LOADING);

		socketHandler.init((socket_data) => {
			joinRoom(socket_data).then(data => {
				const user = data.user;
				const room = data.room;
				console.log(`Successfully joined room ${room}`);

				dispatch({type: INIT_USER, payload: {user}});
				dispatch({type: JOIN_ROOM, payload: {room}});
				socketHandler.listenToRoom(room, (e) => handleRoomEvent(dispatch, e));
	
				updateStatus(dispatch, OK);
			});
		}, (err) => {
			console.log(`Error joining room\n${err}`);

			// TODO: split errStatus and normal status into 2 enums (ERROR will be err status)
			updateStatus(dispatch, JOIN_ROOM_ERR);
		});
	} catch (ex) {
		console.error(`[ERROR] connecting to room\n${ex}`);
		updateStatus(dispatch, JOIN_ROOM_ERR);
	}
}

export const sendMessage = (dispatch, getState) => {
	return async (dispatch, getState) => {
		try {
			const state = getState();
			updateStatus(dispatch, SENDING_MSG);

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({
					user: state.user, 
					room: state.room, 
					message: state.messageInput})
			};

			const response = await fetch('http://localhost:8000/sendMessage', requestOptions);
			const data = await response.json();
			if (data.success) {
				updateStatus(dispatch, OK);
				dispatch({type: UPDATE_MSG_INPUT, payload: {message: ''}});
			} else {
				console.error(`[ERROR] With send message API\n${data.error}`);
				updateStatus(dispatch, SEND_MSG_ERR);
			}
		} catch (ex) {
			console.error(`[ERROR] Sending message\n${ex}`);
			updateStatus(dispatch, SEND_MSG_ERR);
			dispatch({type: UPDATE_STATUS, payload: {status: SEND_MSG_ERR}});
		}
	};
};