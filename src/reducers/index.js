import { combineReducers } from 'redux';
import {
  transactions,
  wallet,
  payment
} from './payment_reducer';

const rootReducer = combineReducers({
  transactions,
  wallet,
  payment
});

export default rootReducer;
