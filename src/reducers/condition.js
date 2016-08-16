import { combineReducers } from 'redux';
import {CHANGE_CONDITION} from '../actions/condition';

function condition(state={pagination: { pageSize: 12, total: 10, current: 1}, query: {}}, action){
    switch (action.type) {
      case CHANGE_CONDITION:
        return Object.assign({}, state, action.condition);
      default:
      return state;

    }
}

export default condition
