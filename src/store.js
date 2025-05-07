import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import animeReducer from './reducers/animeReducer';


const rootReducer = combineReducers({
    anime: animeReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;