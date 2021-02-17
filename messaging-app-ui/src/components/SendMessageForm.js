import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Arrow90degRight } from 'react-bootstrap-icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendMessage } from '../redux/actions';
import { UPDATE_MSG_INPUT } from '../redux/actionTypes';
import { LOADING } from '../constants/statusTypes';

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

 function handleKeyDown(event, callback) {
 	if (event.key === 'Enter') {
 		callback();
 	}
 }

 function SendMessageForm(props) {
 	const isLoading = props.status === LOADING;
 	const sendMessage = () => props.sendMessage();
 	return <div className="send-message-container">
			<form className="send-message-form" onSubmit={e => e.preventDefault()}>
				<input type="text" 
					className="send-message-box"
					value={props.message} 
					onChange={e => handleChange(e, props)} 
					placeholder="Send a message..."
					onKeyDown={e => handleKeyDown(e, sendMessage)}/>
				<Button variant="success" onClick={sendMessage}>
					<Arrow90degRight/>
				</Button>
			</form>
		</div>
 }

const mapStateToProps = state => {
	return {
		message: state.messageInput,
		status: state.status
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatch,
		...bindActionCreators({sendMessage}, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);