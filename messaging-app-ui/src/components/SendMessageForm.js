import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendMessage } from '../redux/actions';
import { UPDATE_MSG_INPUT } from '../redux/actionTypes';

// async function sendMessage(user, room, message) {
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json'},
// 		body: JSON.stringify({user, room, message})
// 	};

// 	const response = await fetch('http://localhost:8000/sendMessage', requestOptions);
// 	return await response.json();
// }

 // TODO Start using this one for animations

 function handleChange(event, props) {
 	const input = event.target.value;
 	props.dispatch({type: UPDATE_MSG_INPUT, payload: {message: input}});
 }

 function submitMessage(event, props) {
 	event.preventDefault();
 	props.sendMessage();
 }

 function SendMessageForm(props) {
 	return <div className="send-message-container">
			<form className="send-message-form" onSubmit={e => submitMessage(e, props)}>
				<input type="text" 
					className="send-message-box"
					value={props.message} 
					onChange={e => handleChange(e, props)} 
					placeholder="Send a message..."/>
				<input className="send-message-btn" type="submit" value="Send"/>
			</form>
		</div>
 }

// class SendMessageForm extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {message: ''};
// 	}

// 	submitMessage(event) {
// 		event.preventDefault();

// 		const dispatch = useDispatch();
// 		sendMessage(dispatch, this.props.user, this.props.room, this.state.message).then(res => {
// 			if (res.succes) {
// 				this.stateState({message: ''});
// 			}
// 		});

// 		// TODO: Use Redux state w/ dispatch instead of this
// 		// this.setState({...this.state, status: STATUS.SENDING}, () => {
// 		// 	try {
// 		// 		const message = this.state.message;
// 		// 		const user = this.props.user;
// 		// 		sendMessage(user, this.props.room, message).then(res => {
// 		// 			if (res.success) {
// 		// 				this.setState({...this.state, status: STATUS.IDLE, message: ''}, () => {
// 		// 					console.log(`Message Successfully Sent`);
// 		// 				});
// 		// 			} else {
// 		// 				// TODO: Make this sent, then idle after animation finishes
// 		// 				this.setState({...this.state, status: STATUS.ERROR, err: res.error}, () => {
// 		// 					alert(`Error sending message`);
// 		// 					console.log(`ERROR Sending Message\n${res.error}`);
// 		// 				});
// 		// 			}
// 		// 		})
// 		// 		.catch(err => {
// 		// 			alert('Error sending message');
// 		// 			console.log(`ERROR sending message\n${err}`)
// 		// 		});
// 		// 	} catch (ex) {
// 		// 		console.log(`[ERROR] Sending Message\n${ex}`)
// 		// 	}				
// 		// });
// 	}

// 	handleChange(event) {
// 		this.setState({message: event.target.value});
// 	}

// 	render() {
// 		return <div className="send-message-container">
// 			<form className="send-message-form" onSubmit={e => this.submitMessage(e)}>
// 				<input type="text" 
// 					className="send-message-box"
// 					value={props.message} 
// 					onChange={e => this.handleChange(e)} 
// 					placeholder="Send a message..."/>
// 				<input className="send-message-btn" type="submit" value="Send"/>
// 			</form>
// 		</div>
// 	}
// }

const mapStateToProps = state => {
	return {
		message: state.messageInput
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatch,
		...bindActionCreators({sendMessage}, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);