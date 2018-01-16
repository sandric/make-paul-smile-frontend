import { combineReducers } from 'redux';
import { authStateReducer } from 'redux-oauth';

import subjectsReducer from './subjectsReducer';
import gameReducer from './gameReducer';
import profileReducer from './profileReducer';


export default combineReducers({
  auth: authStateReducer,
  subjects: subjectsReducer,
  game: gameReducer,
  profile: profileReducer
});
