import logo from './logo.svg';
import './App.css';
import MessageViewer from './MessageViewer';
import SendMessageForm from './SendMessageForm';

export default function App() {
  return (
    <div className="App-container">
    	<div className="App-header">
    		<h1>App Name Here</h1>
    	</div>  
    	<div className="App-content">
			<MessageViewer/>
      		<SendMessageForm/>    
    	</div>	
    </div>
  );
}