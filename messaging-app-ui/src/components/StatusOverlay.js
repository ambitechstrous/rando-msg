import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { OK, LOADING } from '../constants/statusTypes';

// TODO: ERROR animations... Why is loading overlay not showing??
function getStatusOverlay(status) {
	switch (status) {
		case LOADING:
			return <LoadingOverlay
						active={true}
						spinner
						text='Loading...'>
					</LoadingOverlay>
		default:
			return ''
	}
}

function StatusOverlay(props) {
	if (props.status !== OK) {
		return <div className='status-overlay'>
			{getStatusOverlay(props.status)}
		</div>
	}

	return '';
}

const mapStateToProps = state => {
	return {
		status: state.status
	};
};

export default connect(mapStateToProps)(StatusOverlay);