import logo from './logo.svg';
import './App.css';
import MessageViewer from './MessageViewer';
import SendMessageForm from './SendMessageForm';

export default function App() {
  return (
    <div className="App">
      <MessageViewer/>
      <SendMessageForm/>
    </div>
  );
}