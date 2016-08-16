import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import RegForm from '../reducers/RegForm';
import Users from '../reducers/Users';
import condition from '../reducers/condition';

const rmiddleware = routerMiddleware(hashHistory)
export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(rmiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  return createStore(
    combineReducers({
      RegForm,
      condition,
      Users,
      routing: routerReducer
    }),
    initialState,
    enhancer);
}
