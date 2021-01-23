const user = 'user_' + Math.random().toString(36).substr(2, 9);
var room = '';

export function getUser() {
	return user;
}

export function getRoom() {
	return room;
}

export function setRoom(roomName) {
	room = roomName;
}