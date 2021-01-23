import React, { Component } from 'react';
import io from 'socket.io-client';
import { sendMessage } from './MessageFunctions';

export default class SendMessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {message: ''};
	}

	submitMessage(event) {
		event.preventDefault();

		const message = this.state.message;
		this.setState({message: ''}, () => {
			sendMessage(message);
		});
	}

	handleChange(event) {
		this.setState({message: event.target.value});
	}

	render() {
		return <div className="send-message-container">
			<form className="send-message-form" onSubmit={e => this.submitMessage(e)}>
				<input type="text" 
					className="send-message-box"
					value={this.state.message} 
					onChange={e => this.handleChange(e)} 
					placeholder="Send a message..."/>
				<input className="send-message-btn" type="submit" value="Send"/>
			</form>
		</div>
	}
}