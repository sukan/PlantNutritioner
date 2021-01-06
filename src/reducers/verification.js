// @flow
import { type Action } from "shared/types/ReducerAction";
import {
  type AsyncStatusType,
  type NotificationType,
} from "shared/types/General";

import { ASYNC_STATUS } from "constants/async";
import {
  ASYNC_VERIFICATION_INIT,
  HANDLE_NOTIFICATION,
  INITIALIZE_VERIFICATION,
  GET_ALL_VERIFICATIONS,
  GET_SINGLE_VERIFICATION,
  ON_CHANGE_FIELDS,
  ON_CHANGE_PRODUCT,
} from "actionTypes/verification";

export type VerificationStateType = {
  status: AsyncStatusType,
  notification: NotificationType,
  verifications: Array<any>,
  verification: null | Object,
};

const initialState: VerificationStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  researches: [],
  verification: null,
};

function asyncVerificationInit(state: VerificationStateType) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function handleNotification(
  state: VerificationStateType,
  { isSuccess, notification }
) {
  return {
    ...state,
    notification,
    status: isSuccess ? ASYNC_STATUS.SUCCESS : ASYNC_STATUS.FAILURE,
  };
}

function onChangeFields(state: VerificationStateType, payload) {
  return {
    ...state,
    verification: {
      ...state.verification,
      ...payload,
    },
  };
}

function onChangeProduct(state: VerificationStateType, payload) {
  const { products } = state.verification;

  let updatedProducts = products.map((product) => {
    if (product.productCode === payload) {
      return {
        ...product,
        verified: !product.verified,
      };
    }
    return product;
  });

  return {
    ...state,
    verification: {
      ...state.verification,
      products: updatedProducts,
    },
  };
}

export default (
  state: VerificationStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ASYNC_VERIFICATION_INIT:
      return asyncVerificationInit(state);
    case HANDLE_NOTIFICATION:
      return handleNotification(state, payload);
    case GET_ALL_VERIFICATIONS:
      return {
        ...state,
        verifications: payload.verifications,
        status: ASYNC_STATUS.SUCCESS,
      };
    case GET_SINGLE_VERIFICATION:
      return {
        ...state,
        verification: payload.verification,
        status: ASYNC_STATUS.SUCCESS,
      };
    case INITIALIZE_VERIFICATION:
      return {
        ...state,
        status: ASYNC_STATUS.INIT,
        notification: null,
        verification: null,
        verifications: [],
      };
    case ON_CHANGE_FIELDS:
      return onChangeFields(state, payload);
    case ON_CHANGE_PRODUCT:
      return onChangeProduct(state, payload);
    default:
      return state;
  }
};
