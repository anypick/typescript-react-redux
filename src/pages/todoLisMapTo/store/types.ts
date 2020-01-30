
export interface ITodoListState {
  readonly inputVal: string
  readonly list: string[]
}

// action的类型
export enum ActionTypes {
  CHANGE_INPUPT = "change_inputvalue",
  ADD_LIST = "add_list",
  DELETE_LIST = "delete_list",
  INIT_STATE = "initial_state",
  GET_STATE = "get_state"
}

export interface IChangeInputAction {
  type: ActionTypes.CHANGE_INPUPT
  inputValue: string
}

export interface IAddTodoListAction {
  type: ActionTypes.ADD_LIST
}

export interface IDeleteTodoListAction {
  type: ActionTypes.DELETE_LIST
  index: number
}

export interface IInitialStateAction {
  type: ActionTypes.INIT_STATE
  list: string[]
}

export interface IGetState {
  type: ActionTypes.GET_STATE
}

export type TodoListAction = IChangeInputAction | IAddTodoListAction
 | IDeleteTodoListAction | IInitialStateAction 
 | IGetState