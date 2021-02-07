import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
	return <div className="App-header">
  		<h1>Messaging App</h1>
    	<p>Logged in as: {props.user}</p>
    	<p>In Room: {props.room}</p>
    </div>  
}

const mapStateToProps = state => {
	return {
		user: state.user,
		room: state.room
	};
};

export default connect(mapStateToProps)(Header);