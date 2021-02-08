import React, { Component } from 'react';
import { connect } from 'react-redux';

import SocketEvents from '../constants/socketEvents';

function MessageView(props) {
	return <div className="message-view" key={JSON.stringify(props)}>
		<h5 className="message-user-name">{props.user}</h5>
		<div className="message-box">
			<p>{props.message}</p>
		</div>
	</div>
}

class MessageViewer extends Component {
	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	socket.on(SocketEvents.CONNECTION_FAILED, (err) => {
	// 		alert('Error joining room');
	// 		console.log(`Error joining room\n${err}`);
	// 	});

	// 	socket.on(SocketEvents.USER_CONNECTED, (socket_data) => {
	// 		const generatedUser = 'user_' + Math.random().toString(36).substr(2, 9);
	// 		const requestOptions = {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json'},
	// 			body: JSON.stringify({user: generatedUser, room: socket_data.room})
	// 		};	

	// 		fetch('http://localhost:8000/joinRoom', requestOptions)
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				const user = data.user;
	// 				const room = data.room;
	// 				console.log(`Successfully joined room ${room}`);

	// 				this.props.createUser({user});
	// 				this.props.joinRoom({room});
	// 				this.listenToEvents();
	// 			})
	// 			.catch(err => {
	// 				alert('Error joining room');
	// 				console.log(`Error joining room\n${err}`);
	// 			});
	// 	});
	// }

	// listenToEvents() {
	// 	socket.on(this.state.room).on(SocketEvents.NEW_MESSAGE, (data) => {
	// 		this.props.addMessage(data);
	// 	});

	// 	socket.on(this.state.room).on(SocketEvents.USER_JOINED, (data) => {
	// 		// TODO: Show user connected in UI
	// 		console.log("USER CONNECTED");
	// 	});
	// }

	render() {
		const messageViews = this.props.messages.map(x => MessageView(x));
		return <div className="message-viewer-container">
			<ul className="message-list">{messageViews}</ul>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		messages: state.messages,
		room: state.room,
		user: state.user
	};
};

export default connect(mapStateToProps)(MessageViewer);