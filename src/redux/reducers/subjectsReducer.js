import { SIGN_OUT } from 'redux-oauth';
import { SUBJECTS_REQUEST_STARTED, SUBJECTS_REQUEST_FINISHED, SUBJECTS_REQUEST_ERROR } from 'redux/actions/subjectActions';

const initialState = {
  loading: false,
  errors: null,
  subjects: null
};

export default function (state = initialState, action) {
  switch (action.type) {
  case SUBJECTS_REQUEST_STARTED:
    return Object.assign({}, state, { loading: true, errors: null });
  case SUBJECTS_REQUEST_FINISHED:
    return Object.assign({}, state, {
      loading: false,
      errors: null,
      subjects: action.subjects
    });
  case SUBJECTS_REQUEST_ERROR:
    return Object.assign({}, state, { loading: false, errors: action.errors });

  case SIGN_OUT:
    return initialState;
  default:
    return state;
  }
}
