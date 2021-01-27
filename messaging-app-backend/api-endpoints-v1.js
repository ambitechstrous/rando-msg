import SocketEvents from './socket-events';
import { getCurrentRoom } from './rooms';

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
	const room = getCurrentRoom();
	const user = req.query.user;
	io.to(room).emit(SocketEvents.USER_JOINED, user);
	console.log("Connected to room " + room);
	res.send({room: room});
}

// TODO: Room as param (to support multiple rooms)
export async function sendMessage(req, res, io) {
	const user = req.body.user;
	const message = req.body.message;
	const payload = {user: user, message: message};
	
	io.to(getCurrentRoom()).emit(SocketEvents.NEW_MESSAGE, payload);
	res.send({success: true});
}