import fetch from 'node-fetch';
import SocketEvents from './socket-events';

const MAX_USERS = 2;
let rooms = [];
var count = -1; // TODO Something better/more scalable than count 

export function getCurrentRoom() {
	const idx = rooms.length - 1;
	return rooms[idx];
}

export async function getRandomRoomName() {
	const response = await fetch('https://random-words-api.vercel.app/word');
	const data = await response.json();
	const wordDetails = data[0];
	return wordDetails ? wordDetails.word : `Room ${rooms.length+1}`;
}

export async function findRoom() {
	count += 1;
	if (count % MAX_USERS === 0) {
		console.log('Creating new room');

		const roomName = await getRandomRoomName();
		rooms.push(roomName);
		return roomName;
	}

	return getCurrentRoom();
}

export async function connectToRoom(io, socket) {
	try {
		console.log(`Socket with id ${socket.id} is joining`);

		const room = await findRoom();
		await socket.join(room);
		socket.emit(SocketEvents.USER_CONNECTED, {room});
		console.log(`Socket ${socket.id} joined room ${room}`);						
	} catch (e) {
		console.error(`Unexpected Error Occurred:\n${e}`);

		socket.emit(SocketEvents.CONNECTION_FAILED);
		console.log(`ERROR connecting socket ${socket.id} to room ${room}\n${err}`);		
	}
}