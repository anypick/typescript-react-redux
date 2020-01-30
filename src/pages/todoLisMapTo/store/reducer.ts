import { TodoListAction, ITodoListState, ActionTypes } from "./types";

const initialState: ITodoListState = {
  inputVal: "",
  list: []
}

export const reducer = (state: ITodoListState = initialState, action: TodoListAction) => {
  const data = [...state.list]
  switch (action.type) {
    case ActionTypes.CHANGE_INPUPT:
      return {
        ...state,
        inputVal: action.inputValue
      }
    case ActionTypes.ADD_LIST:
      data.push(state.inputVal)
      return {
        ...state,
        list: data,
        inputVal: ""
      }
    case ActionTypes.DELETE_LIST:
      data.splice(action.index, 1)
      return {
        ...state,
        list: data
      }
    case ActionTypes.INIT_STATE:
      data.push(...action.list)
      return {
        ...state,
        list: data
      }
    default:
      return {
        ...state
      }
  }
}