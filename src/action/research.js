// @flow
import {
  ASYNC_RESEARCH_INIT,
  INITIALIZE_RESEARCH,
  HANDLE_NOTIFICATION,
  GET_ALL_RESEARCHES,
} from "actionTypes/research";
import Alert from "components/Alert";

function asyncResearchInit() {
  return {
    type: ASYNC_RESEARCH_INIT,
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

export function getAllResearches(query: Object) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncResearchInit());

    let researchService = serviceManager.get("ResearchService");

    researchService
      .getAllResearches(query)
      .then(({ success, data, message }) => {
        if (success) {
          dispatch({ type: GET_ALL_RESEARCHES, payload: data });
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

export function saveResearch(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncResearchInit());

    let researchService = serviceManager.get("ResearchService");

    researchService
      .saveResearch(payload)
      .then(({ success, message }) => {
        if (success) {
          dispatch(notificationHandler(true, "Product saved successfully"));
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

export function initializeResearch() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_RESEARCH });
  };
}
