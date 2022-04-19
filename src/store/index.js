import { createStore, combineReducers, applyMiddleware } from "redux";
import { todos } from "./reducers/todos";
import { movies } from "./reducers/movies";
import { composeWithDevTools } from "@redux-devtools/extension";
import { heroes } from "./reducers/heroes";
import thunk from "redux-thunk";

export const store = createStore(
  combineReducers({
    movies,
    todos,
    heroes,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
