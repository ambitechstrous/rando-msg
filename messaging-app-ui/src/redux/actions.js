import { NEW_MESSAGE, JOIN_ROOM } from './actionTypes';

export const newMessage = content => ({
	type: NEW_MESSAGE,
	payload: content,
});

export const joinRoom = content => ({
	type: JOIN_ROOM,
	payload: content,
});