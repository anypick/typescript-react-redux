
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

  useEffect(() => {
    // dispatch()
  }, [])
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