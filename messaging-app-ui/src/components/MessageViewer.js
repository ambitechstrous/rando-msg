import React, { Component } from 'react';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import { newMessage, joinRoom } from '../redux/actions';

const socket = io('ws://localhost:8080/');

function MessageView(props) {
	return <div className="message-view" key={JSON.stringify(props)}>
		<h5 className="message-user-name">{props.user}</h5>
		<div className="message-box">
			<p>{props.message}</p>
		</div>
	</div>
}

class MessageViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {messages: []};
	}

	componentDidMount() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({user: this.props.user})
		};	

		fetch('http://localhost:8000/joinRoom', requestOptions)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.props.joinRoom({room: data.room});
				this.listenToEvents();
			})
			.catch(err => {
				alert('Error joining room');
				console.log(err);
			});
	}

	listenToEvents() {
		socket.on(this.state.room).on('new message', (data) => {
			this.props.newMessage(data);
		});

		socket.on(this.state.room).on('user joined', (data) => {
			console.log("USER CONNECTED");
		});
	}

	render() {
		const messageViews = this.props.messages.map(x => MessageView(x));
		return <div className="message-viewer-container">
			<ul className="message-list">{messageViews}</ul>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		messages: state.messages,
		room: state.room
	};
};

export default connect(mapStateToProps, { newMessage, joinRoom })(MessageViewer);