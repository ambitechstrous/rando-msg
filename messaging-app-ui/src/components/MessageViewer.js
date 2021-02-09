import React, { Component } from 'react';
import { connect } from 'react-redux';

import SocketEvents from '../constants/socketEvents';

// TODO call user self instead?
function MessageView(self, props) {
	return <div className="message-view" key={JSON.stringify(props)}>
		<h5 className="message-user-name">{self == props.user ? 'You' : props.user}</h5>
		<div className="message-box">
			<p>{props.message}</p>
		</div>
	</div>
}

function MessageViewer(props) {
	const user = props.user;
	const messageViews = props.messages.map(x => MessageView(user, x));
	return <div className="message-viewer-container">
		<ul className="message-list">{messageViews}</ul>
	</div>
}

const mapStateToProps = state => {
	return {
		messages: state.messages,
		room: state.room,
		user: state.user
	};
};

export default connect(mapStateToProps)(MessageViewer);