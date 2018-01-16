import { fetch, parseResponse } from 'redux-oauth';
import { isUserSignedIn } from '../models/user';

export const SUBJECTS_REQUEST_STARTED = 'SUBJECTS_REQUEST_STARTED';
export const SUBJECTS_REQUEST_FINISHED = 'SUBJECTS_REQUEST_FINISHED';
export const SUBJECTS_REQUEST_ERROR = 'SUBJECTS_REQUEST_ERROR';

function subjectsRequestStarted() {
  return { type: SUBJECTS_REQUEST_STARTED };
}

function subjectsRequestFinished(subjects) {
  return { type: SUBJECTS_REQUEST_FINISHED, subjects };
}

function subjectsRequestError(errors) {
  return { type: SUBJECTS_REQUEST_ERROR, errors };
}

export function subjectsRequest() {
  return (dispatch, getState) => {
    if (!isUserSignedIn(getState())) {
      return Promise.resolve();
    }

    dispatch(subjectsRequestStarted());

    return dispatch(fetch('http://localhost:4000/subjects'))
      .then(parseResponse)
      .then(({ subjects }) => dispatch(subjectsRequestFinished(subjects)))
      .catch((errors) => dispatch(subjectsRequestError(errors)));
  };
}
