import SocketEvents from './socket-events';

let rooms = [];
var lastMessage = {};

// export async function sendMessage(req, res, io) {
// 	console.log("Hitting this");

// 	const message = req.query.message;
// 	if (lastMessage != message) {
// 		lastMessage = {
// 			message: message,
// 			user: req.query.user
// 		};
// 	}

// 	console.log("Testing");

// 	res.send({success: true});
// }

// TODO: Multiple rooms
export async function joinRoom(req, res, io) {
	if (rooms.length == 0) {
		const roomName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
		rooms.push(roomName);
	}

	const user = req.query.user;
	const socket_id = Math.random().toString(36).substr(2, 9);

	io.of('/').adapter.remoteJoin(socket_id, rooms[0]);
	io.to(rooms[0]).emit(SocketEvents.USER_JOINED, user);
	res.send({room: rooms[0], socket_id: socket_id});;
}

// TODO: Room as param (to support multiple rooms)
export async function sendMessage(req, res, io) {
	const user = req.query.user;
	const message = req.query.message;

	io.to(rooms[0]).emit(SocketEvents.NEW_MESSAGE, {user, message});
	res.send({success: true});
}