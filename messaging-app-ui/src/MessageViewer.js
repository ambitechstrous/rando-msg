import React, { Component } from 'react';
import io from 'socket.io-client';

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
		const data = JSON.stringify(this.state.messages);
		return <div>
			<h1>Will see messages here...</h1>
			<p>{data}</p>
		</div>
	}
}