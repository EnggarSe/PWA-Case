import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
// import { reducer as formReducer } from 'redux-form'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducers from '../redux-saga/reducers'
import rootSaga from '../redux-saga/sagas'
import createHistory from 'history/createBrowserHistory'


const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware]

const store = createStore(
   combineReducers({
      ...reducers,
      routing : routerReducer
   }),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   compose(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export {store, history}