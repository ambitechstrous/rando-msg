import express from 'express';
import http from 'http';
import io from 'socket.io'
import { sendMessage, listenToChat } from './api-endpoints-v1';

// 1. Messaging works
// 2. Functionality for different users per client
// 		- some API endpoint /.../<unique_id>
//		- connect sockets to this endpoint...
// 3. Adding users to segmented convos (i.e. different convos)
// 4. Prettier UI
const app = express();
const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log("Running on port " + port));

const socket_conn = io(server, {
	cors: {origin: '*'}
});

socket_conn.on('connection', (socket) => {
	console.log("User connected!");

	socket.on('send message', (data) => {
		console.log("Sending message...");
		socket_conn.emit('new message', data);
	});
});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});