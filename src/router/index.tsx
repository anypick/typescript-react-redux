import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import TodoList from "../pages/todoList";
import TodoListMapTo from "../pages/todoLisMapTo";
import TodoListReactHooks from "../pages/todoListReact"

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
        <h1>
          <Link to="/react/hooks/reducer"> react hooks reducer </Link>
        </h1>
      </div>
      <Switch>
        <Route exact={true} path="/redux/hooks" component={TodoList}/>
        <Route path="/redux/map">
          <TodoListMapTo />
        </Route>
        <Route path="/react/hooks/reducer" component={TodoListReactHooks}/>
      </Switch>
    </BrowserRouter>
  )
}