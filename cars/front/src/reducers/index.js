import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import cars from './cars';

export default combineReducers({
  form,
  cars,
});
