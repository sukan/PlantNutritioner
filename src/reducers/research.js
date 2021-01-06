// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";
import {
  ASYNC_RESEARCH_INIT,
  INITIALIZE_RESEARCH,
  HANDLE_NOTIFICATION,
  GET_ALL_RESEARCHES,
} from "actionTypes/research";

export type ResearchStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  researches: Array<any>,
};

const initialState: ResearchStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  researches: [],
};

function asyncResearchInit(state: ResearchStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function handleNotification(
  state: ResearchStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

export default (
  state: ResearchStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ASYNC_RESEARCH_INIT:
      return asyncResearchInit(state);
    case HANDLE_NOTIFICATION:
      return handleNotification(state, payload);
    case GET_ALL_RESEARCHES:
      return {
        ...state,
        researches: payload.researches,
        status: ASYNC_STATUS.SUCCESS,
      };
    case INITIALIZE_RESEARCH:
      return {
        ...state,
        status: ASYNC_STATUS.INIT,
        notification: null,
      };
    default:
      return state;
  }
};
