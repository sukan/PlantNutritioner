// @flow
import {
  ASYNC_DEFICIENCY_INIT,
  HANDLE_NOTIFICATION,
  GET_ALL_DEFICIENCY,
} from "actionTypes/deficiency";
import Alert from "components/Alert";

function asyncDeficiencyInit() {
  return {
    type: ASYNC_DEFICIENCY_INIT,
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

export function getAllDeficiency(query: Object) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncDeficiencyInit());

    let deficiencyService = serviceManager.get("DeficiencyService");

    deficiencyService
      .getAllDeficiency(query)
      .then(({ success, data }) => {
        if (success) {
          dispatch({ type: GET_ALL_DEFICIENCY, payload: data });
        } else {
          dispatch(
            notificationHandler(false, "Something went wrong. Please try again")
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

export function saveDeficiency(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncDeficiencyInit());

    let deficiencyService = serviceManager.get("DeficiencyService");

    deficiencyService
      .saveDeficiency(payload)
      .then(({ success, message }) => {
        if (success) {
          dispatch(notificationHandler(true, "Deficiency saved successfully"));

          deficiencyService
            .getAllDeficiency({ researchCenter: payload.researchCenter })
            .then(({ success, data }) => {
              if (success) {
                dispatch({ type: GET_ALL_DEFICIENCY, payload: data });
              } else {
                dispatch(
                  notificationHandler(
                    false,
                    "Something went wrong. Please try again"
                  )
                );
              }
            })
            .catch(() => {
              dispatch(
                notificationHandler(
                  false,
                  "Something went wrong. Please try again"
                )
              );
            });
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
