import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../app/types';
import { removeNotification } from './actions';
import NotificationList from './components/NotificationList';
import { STORE_KEY_NOTIFICATIONS } from './types';

const mapStateToProps = (state: ApplicationState) => ({
  notifications: state[STORE_KEY_NOTIFICATIONS],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onClose: removeNotification,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationList);
