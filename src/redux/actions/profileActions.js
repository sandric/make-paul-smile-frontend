import { fetch, parseResponse } from 'redux-oauth';
import { isUserSignedIn } from '../models/user';
import formatMoveChessNotation from '../../common/notation';


export const USER_UPDATE_REQUEST_STARTED = 'USER_UPDATE_REQUEST_STARTED';
export const USER_UPDATE_REQUEST_FINISHED = 'USER_UPDATE_REQUEST_FINISHED';
export const USER_UPDATE_REQUEST_ERROR = 'USER_UPDATE_REQUEST_ERROR';

function userUpdateRequestStarted() {
  return { type: USER_UPDATE_REQUEST_STARTED };
}

function userUpdateRequestFinished(user) {
  return { type: USER_UPDATE_REQUEST_FINISHED, user };
}

function userUpdateRequestError(errors) {
  return { type: USER_UPDATE_REQUEST_ERROR, errors };
}

export function userUpdateRequest(images) {
  return (dispatch, getState) => {
    if (!isUserSignedIn(getState())) {
      return Promise.resolve();
    }

    const image = images.pop();

    let formData = new FormData();
    formData.append('user[avatar]', image);

    dispatch(userUpdateRequestStarted());

    return dispatch(fetch('http://localhost:4000/users/1', {
      method: "PUT",
      body: formData
    }))
      .then(parseResponse)
      .then(({ user }) => dispatch(userUpdateRequestFinished(user)))
      .catch((errors) => dispatch(userUpdateRequestError(errors)))
  };
}
