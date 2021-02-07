import { ADD_MESSAGE, JOIN_ROOM, CREATE_USER } from './actionTypes';

export const addMessage = content => ({
	type: ADD_MESSAGE,
	payload: content,
});

export const joinRoom = content => ({
	type: JOIN_ROOM,
	payload: content,
});

export const createUser = content => ({
	type: CREATE_USER,
	payload: content,
});