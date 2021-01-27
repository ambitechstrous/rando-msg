import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../MessageFunctions';

class SendMessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {message: ''};
	}

	submitMessage(event) {
		event.preventDefault();

		const message = this.state.message;
		this.setState({message: ''}, () => {
			this.sendMessage(message);
		});
	}

	sendMessage(message) {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({
				message: message, 
				user: this.props.user, 
				room: this.props.room})
		};

		fetch('http://localhost:8000/sendMessage', requestOptions)
			.then(res => res.json())
			.then((result) => {
				console.log(result);
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

const mapStateToProps = state => {
	return {
		messages: state.messages,
		user: state.user,
		room: state.room
	};
};

export default connect(mapStateToProps)(SendMessageForm);