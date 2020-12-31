import React, { Component } from 'react';
import io from 'socket.io-client';

export default class SendMessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {message: ''};
	}

	sendMessage(event) {
		event.preventDefault();

		const socket = io('http://localhost:8000');
		socket.emit('send message', {user: 'Jose', message: this.state.message});
	}

	handleChange(event) {
		this.setState({message: event.target.value});
	}

	render() {
		return <div>
			<form onSubmit={e => this.sendMessage(e)}>
				<input type="text" 
					value={this.state.message} 
					onChange={e => this.handleChange(e)} 
					placeholder="Send a message..."/>
				<input type="submit" value="Send"/>
			</form>
		</div>
	}
}