import { SIGN_OUT } from 'redux-auth';
import { USER_UPDATE_REQUEST_STARTED, USER_UPDATE_REQUEST_FINISHED, USER_UPDATE_REQUEST_ERROR } from 'redux/actions/profileActions';

const initialState = {
  loading: false,
  errors: null,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
  case USER_UPDATE_REQUEST_STARTED: {
    return Object.assign({}, state, { loading: true, errors: null });
  }
  case USER_UPDATE_REQUEST_FINISHED: {
    return Object.assign({}, state, {
      loading: false,
      errors: null,
      user: action.user
    });
  }
  case USER_UPDATE_REQUEST_ERROR: {
    return Object.assign({}, state, { loading: false, errors: action.errors });
  }

  case SIGN_OUT:
    return initialState;
  default:
    return state;
  }
}
