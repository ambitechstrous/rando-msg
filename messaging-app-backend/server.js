import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import redis from 'redis';
import SocketEvents from './socket-events';
import { Server } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
import { sendMessage, joinRoom } from './api-endpoints-v1';
import { connectToRoom, findRoom } from './rooms';

// TODOS
// 1. More scalable solution for storing rooms
// 2. README with details on project
// 3. Small Stuff
//		- Distributed server instead of single (use adapters, maybe make one)
//		- Migrate messaging logic to react middleware
// 4. Prettier UI
//		- Show when users join
//		- Loading animations
// 5. Show when user starts typing

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

io.on('connection', (socket) => connectToRoom(io, socket));

app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Content-Type', 'application/json');
	next();
});

app.post('/sendMessage', (req, res) => sendMessage(req, res, io));
app.post('/joinRoom', (req, res) => joinRoom(req, res, io));