import { ActionTypes, IChangeInputAction } from "./types";
import { ActionCreator } from "redux";

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