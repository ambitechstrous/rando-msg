import { io } from 'socket.io-client';

import SocketEvents from '../constants/socketEvents';
import { ADD_MESSAGE, ADD_OTHER_USER, JOIN_ROOM, INIT_USER, UPDATE_STATUS } from './actionTypes';
import { OK, LOADING, JOIN_ROOM_ERR } from '../constants/statusTypes';

async function listenForMessages(dispatch, socket, user, room) {
	socket.on(room).on(SocketEvents.NEW_MESSAGE, (data) => {
		dispatch({type: ADD_MESSAGE, payload: {user: data.user, room: data.room, message: data.message}});
	});

	socket.on(room).on(SocketEvents.USER_JOINED, (data) => {
		dispatch({type: ADD_OTHER_USER, payload: {user: data.user}});
	});
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

export async function connectToRoom(dispatch) {
	try {
		dispatch({type: UPDATE_STATUS, payload: {status: LOADING}});

		const socket = io.connect('http://localhost:8080/', {reconnect: true});
		socket.on(SocketEvents.CONNECTION_FAILED, (err) => {
			console.log(`Error joining room\n${err}`);

			// TODO: split errStatus and normal status into 2 enums (ERROR will be err status)
			dispatch({type: UPDATE_STATUS,  payload: {status: JOIN_ROOM_ERR, message: 'Error joining room'}});
		});

		socket.on(SocketEvents.USER_CONNECTED, (socket_data) => {
			joinRoom(socket_data).then(data => {
				const user = data.user;
				const room = data.room;
				console.log(`Successfully joined room ${room}`);

				listenForMessages(dispatch, socket, user, room);
				dispatch({type: UPDATE_STATUS, payload: {status: OK}});
				dispatch({type: INIT_USER, payload: {user}});
				dispatch({type: JOIN_ROOM, payload: {room}});
			});
		});
	} catch (ex) {
		console.error(`[ERROR] connecting to room\n${ex}`);
		dispatch({type: UPDATE_STATUS, payload: {status: JOIN_ROOM_ERR, message: 'Error connecting to room'}});
	}
}