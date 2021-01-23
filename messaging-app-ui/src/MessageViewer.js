import React, { Component } from 'react';
import { listenToMessages } from './MessageFunctions';

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
		listenToMessages((data) => this.addMessage(data));
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