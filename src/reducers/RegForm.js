import { combineReducers } from 'redux';

import {CHANGE_FORM_DATA, CHANGE_FORM_LOADING } from "../actions/RegForm.js";


let initRegFormState = {isLoading: false};
function RegForm(state=initRegFormState, action) {
  switch (action.type) {
    case CHANGE_FORM_DATA:
      return Object.assign({}, state, action.data);
    case CHANGE_FORM_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    default:
    return state;

  }

}
// const AppReducer = combineReducers({
//   cartMassage
// });

export default RegForm;
