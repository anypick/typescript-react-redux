
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
    <div>
      <h1>mapToProps</h1>
      <div>
        <input type="text" value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)} />
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