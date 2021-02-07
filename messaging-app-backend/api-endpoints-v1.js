import SocketEvents from './socket-events';
import { findRoom } from './rooms';

export async function joinRoom(req, res, io) {
	try {
		const room = req.body.room;
		const user = req.body.user;
		io.to(room).emit(SocketEvents.USER_JOINED, user);

		console.log(`User ${user} joined room ${room}`)
		res.send({user, room});
	} catch (ex) {
		console.error(`ERROR JOINING ROOM\n\n${ex}\n`);
		res.status(500).send({success: false, error: 'Unable to join room'});
	}
}

export async function sendMessage(req, res, io) {
	try {
		const user = req.body.user;
		const message = req.body.message;
		const room = req.body.room;
		const payload = {user: user, message: message};
		io.to(room).emit(SocketEvents.NEW_MESSAGE, payload);

		console.log(`${user} sent message in ${room}`);
		res.send({success: true, message: message});
	} catch (ex) {
		console.error(`ERROR SENDING MESSAGE\n${ex}\n`);
		res.status(500).send({success: false, error: 'Unable to send message'});
	}
}