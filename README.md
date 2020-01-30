# React Hooks + TypeScript + Redux 开发案例

**说明**: 这篇文档介绍如何在`TypeScript`环境下使用`Redux`，`React-Redux`以及`Redux-thunk`。希望看到这篇文章的小伙伴能够有所收获。

# 1. 项目初始化

> 这里不做过多的描述，主要的工作就是：
>
> 1. 使用create-react-app创建TypeScript + React项目
> 2. 去除多余的文件以或者文件夹

```shell
# 创建项目
$ create-react-app typescript-react-redux --template typescript
# 启动项目
$ yarn start
# 访问http://localhost:3000/index#/ 出现如下图所示的页面，则项目初始化成功
```

```shell
# 清楚多余文件（夹）后的目录结构
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── index.tsx
│   └── react-app-env.d.ts
├── tsconfig.json
└── yarn.lock
```

# 2. 实现TodoList



```shell
# 1. 安装依赖
$ yarn add redux react-redux @types/react-redux redux-thunk
```

## 1. 定义todoList store

**【src/pages/todoList/store/types.ts】**

```tsx
// 定义TodoList组件中状态
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

// input框变化的action
export interface IChangeInputAction {
  type: ActionTypes.CHANGE_INPUPT
  inputValue: string
}

// 定义向list中添加数据action
export interface IAddTodoListAction {
  type: ActionTypes.ADD_LIST
}

// 定义删除list中数据action
export interface IDeleteTodoListAction {
  type: ActionTypes.DELETE_LIST
  index: number
}

// action集合
export type TodoListAction = IChangeInputAction | IAddTodoListAction | IDeleteTodoListAction
```

**【src/pages/todoList/store/reducer.ts】**

```tsx
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
    default:
      return {
        ...state
      }
  }
}
```

**【src/pages/todoList/store/actions.ts】**

> 定义各个action的具体实现

```tsx
import { ActionTypes, IChangeInputAction } from "./types";
import { ActionCreator } from "redux";

// 如果你想指定返回值的类型，可以想这个action一样做
// 也可以像后面两个action一样，不指定返回值
export const changeInputValueAction: ActionCreator<IChangeInputAction> = (data: string) => {
  return {
    type: ActionTypes.CHANGE_INPUPT,
    inputValue: data
  }
}

export const addListAction = () => {
  return {
    type: ActionTypes.ADD_LIST
  }
}

export const deleteListAction = (value: number) => {
  return {
    type: ActionTypes.DELETE_LIST,
    index: value
  }
}
```

### TodoList页面

**【src/pages/todoList/index.tsx】**

```tsx

import React, { useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../store';
import { changeInputValueAction, addListAction, deleteListAction } from './store/actions';
const TodoList: React.FC = () => {
  const inputValue = useSelector<IRootState, string>(state => state.todoList.inputVal)
  const list = useSelector<IRootState, string[]>(state => state.todoList.list)
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeInputValueAction(e.target.value))
  }

  const handleClick = () => {
    dispatch(addListAction())
  }

  const deleteList = (value: number) => {
    dispatch(deleteListAction(value))
  }
  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)} />
        <button onClick={handleClick}>提交</button>
      </div>
      <div>
        <ul>
          {
            list.map((value, index) => {
              return (
            <li key={index} onClick={() => deleteList(index)}>{value}</li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
```

## 2. 使用react-redux

> 在这里需要注意的一点是：`combineReducers`中的key要和IRootState中保持一致，如图所示
>
> ![image-20200129214059748](/Users/ziidu/Library/Application Support/typora-user-images/image-20200129214059748.png)

**【src/store/reducer.ts】**

```ts
import { combineReducers } from "redux";
import {reducer as todoListReducer} from "../pages/todoList/store/reducer";
import { IRootState } from ".";

export const rootReducer = combineReducers<IRootState>({
  todoList: todoListReducer
})
```

**【src/store/index.ts】**

> 说明：这里使用`redux-devtools-extension`进行redux状态调试的

```ts
import { createStore, Store, applyMiddleware } from "redux";
import { rootReducer } from "./reducer";
import { ITodoListState } from "../pages/todoList/store/types";
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';

export interface IRootState {
  todoList: ITodoListState
}


export const store: Store<IRootState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
```

## 3. App.tsx

```tsx
import React from 'react';
import TodoList from './pages/todoList';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
```



# 3. mapTo版本

>   以上的代码利用的是hooks的进行数据处理的， 如，`useDispatch`进行action分发， `useSelector`获取store中数据。还有其他的hooks可以参照官方文档。
>
>   在这个板块，会引入`redux-thunk`进行ajax数据请求，使用react-redux中`mapStateToProps`, `mapDispatchToProps`来映射state和action。
>
>   这里只展示主要的改动，其他改动详见代码。
>
>   为了方便管理，这里引入react-router

```shell
$ yarn add react-router-dom @types/react-router-dom
```

**【src/router/index.tsx】**

使用redux进行区分

```tsx
import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TodoList from "../pages/todoList";
import TodoListMapTo from "../pages/todoLisMapTo";

export const IRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{borderBottom: '1px dotted blue', width: "500px", marginBottom: "20px"}}>
        <h1>
          <Link to="/redux/hooks"> redux hooks version </Link>
        </h1>
        <h1>
          <Link to="/redux/map"> mapTo version </Link>
        </h1>
      </div>
      <Switch>
        <Route exact={true} path="/redux/hooks" component={TodoList}/>
        <Route path="/redux/map">
          <TodoListMapTo />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
```

拷贝**【src/pages/todoList】** 为 **【src/pages/todoListMapTo】**，修改

**【src/pages/todoListMapTo/index.tsx】**

```tsx

import React, { ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { changeInputValueAction, addListAction, deleteListAction, getState } from './store/actions';

const TodoListMapTo: React.FC<IProps> = (props) => {
  const { inputValue, list, handleChange, handleClick, deleteList, initalState } = props
  useEffect(() => {
    initalState()
  }, [])
  return (
    ...
  );
}


//Props和IProps都可以作为组件TodoListMapTo的属性
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IProps {
  inputValue: string
  list: string[]
  handleChange: typeof changeInputValueAction
  handleClick: typeof addListAction
  deleteList: typeof deleteListAction
  initalState: typeof getState
}

const mapStateToProps = (state: IRootState) => {
  return {
    inputValue: state.todoListMap.inputVal,
    list: state.todoListMap.list
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleChange(value: string){
      return dispatch(changeInputValueAction(value))
    },
    handleClick() {
      return dispatch(addListAction())
    },

    deleteList(index:number) {
      return dispatch(deleteListAction(index))
    },
    initalState() {
      return dispatch(getState())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListMapTo);
```

增加ajax异步请求的action

**【src/pages/todoLisMapTo/store/actions.ts】**

```tsx
export const getState = () => {
  return async (dispatch: Dispatch) => {
    axios
			.get("/list.json")
			.then(resp => {
				dispatch(initState(resp.data))
			})
  }
}
```

更多细节请参考源码

# 5. React Hooks中Reducer使用

**【src/pages/todoListReact】**

```tsx

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
```