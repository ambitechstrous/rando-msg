import { 
	ADD_MESSAGE, 
	JOIN_ROOM, 
	INIT_USER, 
	UPDATE_MSG_INPUT, 
	UPDATE_STATUS } 
	from './actionTypes';

const initialState = {
	user: '',
	room: '',
	messages: [],
	messageInput: ''
};

// TODO: add state transitions
export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_MESSAGE:
			const payload = action.payload;
			const new_message = { message: payload.message, user: payload.user };
			const messages = state.messages.map((item) => item);
			messages.push(new_message);
			return {
				...state,
				messages
			};
		case JOIN_ROOM:
			return {
				...state,
				room: action.payload.room
			};
		case INIT_USER:
			return {
				...state,
				user: action.payload.user
			}
		case UPDATE_MSG_INPUT:
			return {
				...state,
				messageInput: action.payload.message
			}
		case UPDATE_STATUS:
			return {
				...state,
				status: action.payload.status
			}
		default: 
			return state;
	}
}