import { combineReducers } from "redux";
import {reducer as todoListReducer} from "../pages/todoList/store/reducer";
import {reducer as todoListReducerMapTo} from "../pages/todoLisMapTo/store/reducer";
import { IRootState } from ".";


export const rootReducer = combineReducers<IRootState>({
  todoList: todoListReducer,
  todoListMap: todoListReducerMapTo
})