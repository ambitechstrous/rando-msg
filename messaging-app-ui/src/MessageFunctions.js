import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';
import { getRoom, getUser } from './SessionInfo';

const redis_host = process.env.REDIS_HOST;
const redis_pass = process.env.REDIS_PW;

const io = new Server(port);
const pubClient = redis.createClient({host: redis_host, port: 6379, password: redis_pass});
const subClient = pubClient.duplicate();
//const socket = io('http://localhost:8000');

io.adapter(createAdapter({pubClient, subClient}));

// const socket = io('http://localhost:8000');
// 			socket.emit('send message', {user: getUser(), message: message});
export function sendMessage(message) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type', 'application/json'},
		body: JSON.stringify({message: message, user: getUser(), room: getRoom()});
	};

	fetch('http://localhost:8000/sendMessage', requestOptions)
		.then(res => res.json())
		.then((result) => {
			console.log(result);
		});
}

export function listenToMessages(callback) {
	io.of(getRoom()).on('new message', (data) => {
		callback(data);
	});
}

export function listenToRoomConnections(callback) {
	io.of(getRoom()).on('user joined', (data) => {
		callback(data);
	});
}