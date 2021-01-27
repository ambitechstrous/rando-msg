import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
	return <div className="App-header">
  		<h1>Messaging App</h1>
    	<p>Logged in as: {props.user}</p>
    </div>  
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(Header);