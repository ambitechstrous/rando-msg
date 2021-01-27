import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import redis from 'redis';
import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import { sendMessage, joinRoom } from './api-endpoints-v1';
import { getCurrentRoom } from './rooms';

// 1. Messaging works
// 2. Functionality for different users per client
// 		- some API endpoint /.../<unique_id>
//		- connect sockets to this endpoint...
// 3. Adding users to segmented convos (i.e. different convos)
// 4. Prettier UI
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const app = express();
const port = process.env.PORT || 8000;
const socket_port = process.env.SOCKET_PORT || 8080;
const redis_host = process.env.REDIS_HOST;
const redis_pass = process.env.REDIS_PW;
const server = app.listen(port, () => console.log("Running on port " + port));

const io = new Server(socket_port, {cors: {origin: '*'}});
const pubClient = redis.createClient({host: redis_host, port: 6379, password: redis_pass});
const subClient = pubClient.duplicate();

io.adapter(createAdapter({pubClient, subClient}));

io.on('connection', (socket) => {
	try {
		io.of('/').adapter.remoteJoin(socket.id, getCurrentRoom(), err => {
			if (err) {
				console.log("Error joining remotely");
				console.log(err);
			} else {
				console.log("Successfully remote joined");
			}
		});
	} catch (e) {
		console.log("Error: " + e);
	}
});

app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/sendMessage', (req, res) => sendMessage(req, res, io));
app.post('/joinRoom', (req, res) => joinRoom(req, res, io));