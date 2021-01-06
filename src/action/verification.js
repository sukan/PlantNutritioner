// @flow
import {
  INITIALIZE_VERIFICATION,
  HANDLE_NOTIFICATION,
  GET_ALL_VERIFICATIONS,
  ASYNC_VERIFICATION_INIT,
  GET_SINGLE_VERIFICATION,
  ON_CHANGE_FIELDS,
  ON_CHANGE_PRODUCT,
} from "actionTypes/verification";
import Alert from "components/Alert";

function asyncVerificationInit() {
  return {
    type: ASYNC_VERIFICATION_INIT,
  };
}

function notificationHandler(isSuccess, message) {
  return {
    type: HANDLE_NOTIFICATION,
    payload: {
      isSuccess,
      notification: {
        type: isSuccess ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR,
        message,
      },
    },
  };
}

export function getAllVerifications(query: Object) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncVerificationInit());

    let verificationService = serviceManager.get("VerificationService");

    verificationService
      .getAllVerifications(query)
      .then(({ success, data, message }) => {
        if (success) {
          dispatch({ type: GET_ALL_VERIFICATIONS, payload: data });
        } else {
          dispatch(
            notificationHandler(
              false,
              message ? message : "Something went wrong. Please try again"
            )
          );
        }
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}

export function getSingleVerification(query: Object) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncVerificationInit());

    let verificationService = serviceManager.get("VerificationService");

    verificationService
      .getSingleVerification(query)
      .then(({ success, data, message }) => {
        if (success) {
          dispatch({ type: GET_SINGLE_VERIFICATION, payload: data });
        } else {
          dispatch(
            notificationHandler(
              false,
              message ? message : "Something went wrong. Please try again"
            )
          );
        }
      })
      .catch(() => {
        dispatch(
          notificationHandler(false, "Something went wrong. Please try again")
        );
      });
  };
}

export function updateVerification(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncVerificationInit());

    let verificationService = serviceManager.get("VerificationService");

    verificationService
      .updateVerification(payload)
      .then(({ success, message }) => {
        if (success) {
          dispatch(notificationHandler(true, "Verified successfully"));
        } else {
          dispatch(notificationHandler(false, message));
        }
      })
      .catch(({ message }) => {
        dispatch(
          notificationHandler(
            false,
            message ? message : "Something went wrong. Please try again"
          )
        );
      });
  };
}

export function initializeVerification() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_VERIFICATION });
  };
}

export function onChangeFields(payload) {
  return (dispatch) => {
    dispatch({ type: ON_CHANGE_FIELDS, payload });
  };
}

export function onChangeProduct(payload) {
  return (dispatch) => {
    dispatch({ type: ON_CHANGE_PRODUCT, payload });
  };
}
