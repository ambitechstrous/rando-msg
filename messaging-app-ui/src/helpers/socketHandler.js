import { io } from 'socket.io-client';

import { 
	NEW_MESSAGE, 
	USER_JOINED, 
	CONNECTION_FAILED, 
	USER_CONNECTED 
} from '../constants/socketEvents';

class SocketHandler {
	// TODO: Pass in URL here instead of hardcode 
	constructor() {
		if (!SocketHandler.instance) {
			this.socket = io.connect('http://localhost:8080/', {reconnect: true});	
			SocketHandler.instance = this;
		}

		return SocketHandler.instance;
	}

	init(onSuccess, onFailure) {
		this.socket.on(CONNECTION_FAILED, (err) => {
			onFailure(err);
		});

		this.socket.on(USER_CONNECTED, (socket_data) => {
			onSuccess(socket_data);
		});
	}

	listenToRoom(room, callback) {
		this.socket.on(room).on(NEW_MESSAGE, (data) => {
			callback({event: NEW_MESSAGE, data: data})
		});

		this.socket.on(room).on(USER_JOINED, (data) => {
			callback({event: USER_JOINED, data: data});
		});
	}
}

const instance = new SocketHandler();
Object.freeze(instance);

export default instance;