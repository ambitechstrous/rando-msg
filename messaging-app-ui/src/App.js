import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header';
import MessageViewer from './components/MessageViewer';
import SendMessageForm from './components/SendMessageForm';

export default function App() {
	return (
   		<div className="App-container">
    		<Header/>
    		<div className="App-content">
				<MessageViewer/>
      			<SendMessageForm/>    
   			</div>	
   		</div>
  	);
}