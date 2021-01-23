import logo from './logo.svg';
import './App.css';
import MessageViewer from './MessageViewer';
import SendMessageForm from './SendMessageForm';
import { setRoom, getUser } from './SessionInfo';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type', 'application/json'},
			body: JSON.stringify({message: message, user: getUser()});
		};	

		fetch('http://localhost:8000/joinRoom', requestOptions)
			.then(res => res.json())
			.then(data => {
				setRoom(data.room);
			})
			.catch(err => {
				alert('Error joining room');
				console.log(err);
			});
	}

	render() {
		return (
    		<div className="App-container">
    			<div className="App-header">
    				<h1>Messaging App</h1>
    				<p>Logged in as: {getUser()}</p>
    			</div>  
    			<div className="App-content">
					<MessageViewer/>
      				<SendMessageForm/>    
    			</div>	
    		</div>
  		);
	}
}