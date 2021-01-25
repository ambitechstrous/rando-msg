let rooms = [];

export function getCurrentRoom() {
	if (rooms.length == 0) {
		const roomName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
		rooms.push(roomName);
	}

	return rooms[0];
}