import { combineReducers } from "redux";
import { createStore } from "redux";
import { FormReducer } from "./reducers/FormReducer";
const rootReducer = combineReducers({
  FormReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
