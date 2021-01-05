import React, { Component } from 'react';
import io from 'socket.io-client';

export default class SendMessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {message: ''};
	}

	sendMessage(event) {
		event.preventDefault();

		const message = this.state.message;
		this.setState({message: ''}, () => {
			const socket = io('http://localhost:8000');
			socket.emit('send message', {user: 'Jose', message: message});
		});
	}

	handleChange(event) {
		this.setState({message: event.target.value});
	}

	render() {
		return <div className="send-message-container">
			<form className="send-message-form" onSubmit={e => this.sendMessage(e)}>
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