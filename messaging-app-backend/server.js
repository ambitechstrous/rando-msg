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

//app.post('/api/v1/sendMessage', (req, res) => sendMessage(res, res, io));
//app.get('/api/v1/listenToChat', listenToChat);
//server.listen(port, () => console.log("Running on port " + port));

// In this episode, Rick has a box with a universe in it, called a microverse battery, which he created to power his car
// The battery represents large corporations, and the car represents their wealth and profits
// Rick wants people to use the stepping gadget he created (i.e. corporate labor) to power his battery, and thus his car
// He realizes the car is no longer being powered, so he goes into the microverse
// In this world, rick meets Zeep, who created his own microverse battery
// Think of the smaller microverse one as a smaller business, possibly owned by someone in an underrepresented group
// This battery detracts from the power of Rick's battery, causing him to try to destroy the smaller microverse
// And this is exactly how big corporations lobby to make it harder for smaller businesses to enter the market
// As an ex-business owner myself, I've had to work with many federal and state laws that would have been challenging if I didn't have capital
// Many regulations that involve fees and fines for starting businesses end up hurting smaller businesses more than the big ones, bc the big ones have plenty of capital to operate