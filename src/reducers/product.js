// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";
import {
  ASYNC_PRODUCT_INIT,
  INITIALIZE_PRODUCT,
  HANDLE_NOTIFICATION,
  GET_ALL_PRODUCTS,
} from "actionTypes/product";

export type ProductStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  products: Array<any>,
};

const initialState: ProductStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  products: [],
};

function asyncProductInit(state: ProductStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function handleNotification(
  state: ProductStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

export default (
  state: ProductStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ASYNC_PRODUCT_INIT:
      return asyncProductInit(state);
    case HANDLE_NOTIFICATION:
      return handleNotification(state, payload);
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload.products,
        status: ASYNC_STATUS.SUCCESS,
      };
    case INITIALIZE_PRODUCT:
      return {
        ...state,
        status: ASYNC_STATUS.INIT,
        notification: null,
      };
    default:
      return state;
  }
};
