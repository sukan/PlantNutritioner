// @flow
import {
  ASYNC_PRODUCT_INIT,
  HANDLE_NOTIFICATION,
  GET_ALL_PRODUCTS,
  INITIALIZE_PRODUCT,
} from "actionTypes/product";
import Alert from "components/Alert";

function asyncProductInit() {
  return {
    type: ASYNC_PRODUCT_INIT,
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

export function getAllProducts(query: Object) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncProductInit());

    let productService = serviceManager.get("ProductService");

    productService
      .getAllProducts(query)
      .then(({ success, data }) => {
        if (success) {
          dispatch({ type: GET_ALL_PRODUCTS, payload: data });
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

export function saveProduct(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch(asyncProductInit());

    let productService = serviceManager.get("ProductService");

    productService
      .saveProduct(payload)
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

export function initializeProduct() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_PRODUCT });
  };
}
