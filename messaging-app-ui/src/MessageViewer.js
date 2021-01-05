import React, { Component } from 'react';
import io from 'socket.io-client';

function MessageView(props) {
	return <div className="message-view" key={props.toString()}>
		<h5 className="message-user-name">{props.user}</h5>
		<div className="message-box">
			<p>{props.message}</p>
		</div>
	</div>
}

export default class MessageViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {messages: []};
		this.listenToMessages();
	}

	listenToMessages() {
		const socket = io('http://localhost:8000');
		socket.on('new message', (data) => {
			console.log("New message");
			this.addMessage(data);
		});
	}

	addMessage(data) {
		let messages = this.state.messages;
		messages.push(data);
		this.setState({messages});
	}

	render() {
		const messageViews = this.state.messages.map(x => MessageView(x));
		return <div className="message-viewer-container">
			<ul className="message-list">{messageViews}</ul>
		</div>
	}
}