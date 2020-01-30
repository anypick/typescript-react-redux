import { createStore, Store, applyMiddleware } from "redux";
import { rootReducer } from "./reducer";
import { ITodoListState } from "../pages/todoList/store/types";
import {ITodoListState as ITodoListStateMap} from "../pages/todoLisMapTo/store/types";
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';

export interface IRootState {
  todoList: ITodoListState
  todoListMap: ITodoListStateMap
}


export const store: Store<IRootState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))