import { ADD_MESSAGE, JOIN_ROOM, CREATE_USER } from './actionTypes';

const initialState = {
	user: '',
	room: '',
	messages: [],
};

export default function(state = initialState, action) {
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
		case CREATE_USER:
			return {
				...state,
				user: action.payload.user
			}
		default: 
			return state;
	}
}