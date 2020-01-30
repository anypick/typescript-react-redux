import { ActionTypes, IChangeInputAction } from "./types";
import { ActionCreator, Dispatch } from "redux";
import axios from "axios";

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

export const initState = (list: string[]) => {
  return {
    type: ActionTypes.INIT_STATE,
    list
  }
}

export interface IResponse {
  list: string[]
}

export const getState = () => {
  return async (dispatch: Dispatch) => {
    axios
			.get("/list.json")
			.then(resp => {
				dispatch(initState(resp.data))
			})
  }
}