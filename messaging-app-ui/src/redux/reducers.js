import { SEND_MESSAGE, JOIN_ROOM } from './actionTypes';

const user = 'user_' + Math.random().toString(36).substr(2, 9);
const initialState = {
	user: user,
	room: '',
	messages: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SEND_MESSAGE:
			const payload = action.payload;
			const new_message = { message: payload.message, user: payload.user };
			const messages = state.messages;
			messages.push(new_message);
			return {
				...state,
				messages: messages,
			};
		case JOIN_ROOM:
			return {
				...state,
				room: action.payload.room,
			};
		default: 
			return state;
	}
}