// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";
import {
  ASYNC_DEFICIENCY_INIT,
  HANDLE_NOTIFICATION,
  GET_ALL_DEFICIENCY,
} from "actionTypes/deficiency";

export type DeficiencyStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  deficiencies: Array<any>,
};

const initialState: DeficiencyStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  deficiencies: [],
};

function asyncDeficiencyInit(state: DeficiencyStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function handleNotification(
  state: DeficiencyStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

export default (
  state: DeficiencyStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ASYNC_DEFICIENCY_INIT:
      return asyncDeficiencyInit(state);
    case HANDLE_NOTIFICATION:
      return handleNotification(state, payload);
    case GET_ALL_DEFICIENCY:
      return {
        ...state,
        deficiencies: payload.deficiencyData,
        status: ASYNC_STATUS.SUCCESS,
      };
    default:
      return state;
  }
};
