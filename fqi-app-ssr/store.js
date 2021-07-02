import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import createRootReducer from './reducers';
import producesMiddleware from './middleware/producesMiddleware';

export const initializeStore = (initialState = {}) => {
  return createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(producesMiddleware, thunk))
  )
}
