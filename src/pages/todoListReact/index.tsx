
import React, { ChangeEvent, useReducer } from 'react';

interface IState {
  inputValue: string
  list: string[]
}

enum ActionTypes {
  CHANGE_INPUPT = "change_inputvalue",
  ADD_LIST = "add_list",
  DELETE_LIST = "delete_list",
  INIT_STATE = "initial_state",
  GET_STATE = "get_state"
}

interface IChangeInputAction {
  type: ActionTypes.CHANGE_INPUPT
  inputValue: string
}

interface IAddTodoListAction {
  type: ActionTypes.ADD_LIST
}

interface IDeleteTodoListAction {
  type: ActionTypes.DELETE_LIST
  index: number
}

interface IInitialStateAction {
  type: ActionTypes.INIT_STATE
  list: string[]
}

interface IGetState {
  type: ActionTypes.GET_STATE
}

type Actions = IChangeInputAction | IAddTodoListAction
  | IDeleteTodoListAction | IInitialStateAction
  | IGetState


function reducer(state: IState, action: Actions): IState {
  var list = state.list
  switch (action.type) {
    case ActionTypes.CHANGE_INPUPT:

      return {
        ...state,
        inputValue: action.inputValue
      }
    case ActionTypes.ADD_LIST:
      list.push(state.inputValue)
      
      return {
        ...state,
        inputValue: "",
        list,
      }
    case ActionTypes.DELETE_LIST:
      list.splice(action.index, 1)
      return {
        ...state,
        list,
      }
    default:
      return state

  }
}

const initialState = {
  inputValue: "",
  list: []
}

const TodoListReactHooks: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);





  return (
    <div>
      <h1>react hooks useReducer</h1>
      <div>
        <input type="text" value={state.inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: ActionTypes.CHANGE_INPUPT, inputValue: e.target.value })} />
        <button onClick={() => dispatch({ type: ActionTypes.ADD_LIST })}>提交</button>
      </div>
      <div>
        <ul>
          {
            state.list.map((value, index) => {
              return (
                <li key={index} onClick={() => dispatch({ type: ActionTypes.DELETE_LIST, index: index })}>{value}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default TodoListReactHooks;