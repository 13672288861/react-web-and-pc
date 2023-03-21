import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import HomeRecuder from './reducer/home'
import thunk from 'redux-thunk'
// import { connect, Provider } from 'react-redux';
const Reducers = combineReducers({
  home: HomeRecuder
})
export default createStore(Reducers, applyMiddleware(thunk))
