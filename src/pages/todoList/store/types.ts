
export interface ITodoListState {
  readonly inputVal: string
  readonly list: string[]
}

// action的类型
export enum ActionTypes {
  CHANGE_INPUPT = "change_inputvalue",
  ADD_LIST = "add_list",
  DELETE_LIST = "delete_list"
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

export type TodoListAction = IChangeInputAction | IAddTodoListAction | IDeleteTodoListAction