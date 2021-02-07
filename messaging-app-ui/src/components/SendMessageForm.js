import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../redux/actions';

async function sendMessage(user, room, message) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
		body: JSON.stringify({user, room, message})
	};

	const response = await fetch('http://localhost:8000/sendMessage', requestOptions);
	return await response.json();
}

 // TODO Start using this one for animations
const STATUS = {
	IDLE: 0,
	SENDING: 1,
	SENT: 2,
	ERROR: 3
};

class SendMessageForm extends Component {

	constructor(props) {
		super(props);
		this.state = {message: '', status: STATUS.IDLE, err: ''};
	}

	submitMessage(event) {
		console.log(`Sending message...`);
		event.preventDefault();

		this.setState({...this.state, status: STATUS.SENDING}, () => {
			try {
				const message = this.state.message;
				const user = this.props.user;
				sendMessage(user, this.props.room, message).then(res => {
					if (res.success) {
						this.setState({...this.state, status: STATUS.IDLE, message: ''}, () => {
							console.log(`Message Successfully Sent`);
						});
					} else {
						// TODO: Make this sent, then idle after animation finishes
						this.setState({...this.state, status: STATUS.ERROR, err: res.error}, () => {
							alert(`Error sending message`);
							console.log(`ERROR Sending Message\n${res.error}`);
						});
					}
				})
				.catch(err => {
					console.log(`ERROR sending message\n${err}`)
				});
			} catch (ex) {
				console.log(`[ERROR] Sending Message\n${ex}`)
			}				
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

export default connect(mapStateToProps, { addMessage })(SendMessageForm);