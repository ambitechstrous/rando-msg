import { SEND_MESSAGE, JOIN_ROOM } from './actionTypes';

export const sendMessage = content => ({
	type: SEND_MESSAGE,
	payload: content,
});

export const joinRoom = content => ({
	type: JOIN_ROOM,
	payload: content,
});