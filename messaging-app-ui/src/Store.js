import { connect } from 'react-redux';
import { sendMessage } from './ActionCreators';

const mapStateToProps = (state) => {
	return {
		user: state.user,
		messages: state.messages,
		room: state.room
	}
}

const mapDispatchToProps = { sendMessage };

export default connect(mapStateToProps, mapDispatchToProps);