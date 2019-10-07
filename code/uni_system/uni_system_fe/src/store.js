import { createStore, applyMiddleware  } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

// const options = {'trace': true, 'traceLimit': 50};
const options = {};
const composeEnhancers = composeWithDevTools(options);

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
      applyMiddleware(...middleware)
  )
);

export default store;