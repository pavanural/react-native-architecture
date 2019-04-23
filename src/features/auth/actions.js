import { NavigationActions } from "react-navigation";
import {
  get,
  set,
  kLoggedInUserMobileNumberKey,
  kLoginTokenKey,
  kProfileInfoKey,
  removeAll,
  kIntroShouldShow
} from "../../utils/preferences";
import { asyncFetch, endpoints } from "../../connectivity";
const {
  signInURL, verifyOTPURL, sessionExtensionURL, forgotPasswordUrl, resetPasswordUrl 
} = endpoints;
import { actionTypes } from "./enum";
import { booleanTypeEnum } from '../../enum/booleanTypeEnum'
const {
  AUTH_REQUEST_INIT,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILURE,
  AUTH_CLEAR_ERROR,
  AUTH_RESET_STATE
} = actionTypes;

// Put this function in common place
const getRequestConfig = params => {
  return {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
};

const authService = async (url, params) => {
  try {
    let payload = getRequestConfig(params);
    let response = await asyncFetch(url, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const onClearErrorAction = () => dispatch => {
  dispatch({ type: AUTH_CLEAR_ERROR });
};

export const onSignInAction = params => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_REQUEST_INIT });
    let response = await authService(signInURL, params);
    let { responseCode, responseMessage, responseDetails } = response;
    if (responseCode === "00") {
      let { userDetails, loginSessionDetails } = responseDetails;
      await set(kLoginTokenKey, loginSessionDetails.loginSessionId);
      await set(kLoggedInUserMobileNumberKey, userDetails.mobileNumber);
      await set(kProfileInfoKey, JSON.stringify(userDetails));
      let data = { ...params, ...responseDetails };
      dispatch({ type: AUTH_REQUEST_SUCCESS, data });
      const shouldShowIntro = await get(kIntroShouldShow);
      if (shouldShowIntro == booleanTypeEnum.NO) {
        dispatch(NavigationActions.navigate({ routeName: "homeRoute" }));
      } else {
        dispatch(NavigationActions.navigate({ routeName: "introRoute" }));
      }
    } else {
      throw new Error(responseMessage);
    }
  } catch (error) {
    let { message } = error;
    dispatch({ type: AUTH_REQUEST_FAILURE, error: { message } });
  }
};

export const onVerifyAction = params => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_REQUEST_INIT });
    let response = await authService(verifyOTPURL, params);
    let { responseCode, responseMessage, responseDetails } = response;
    if (responseCode === "00") {
      let { userDetails, loginSessionDetails } = responseDetails;
      await set(kLoginTokenKey, loginSessionDetails.loginSessionId);
      await set(kLoggedInUserMobileNumberKey, userDetails.mobileNumber);
      await set(kProfileInfoKey, JSON.stringify(userDetails));
      let data = { ...responseDetails };
      dispatch({ type: AUTH_REQUEST_SUCCESS, data });
      dispatch(NavigationActions.navigate({ routeName: "introRoute" }));
    } else {
      throw new Error(responseMessage);
    }
  } catch (error) {
    let { message } = error;
    dispatch({ type: AUTH_REQUEST_FAILURE, error: { message } });
  }
};

export const onResendOTPAction = params => async (dispatch, getState) => {
  try {
    // let { profile } = getState();
    // let {
    //   data: { mobileNumber, userType }
    // } = profile;
    // let params = { mobileNumber, userType };
    let response = await authService(signInURL, params);
    let { responseCode, responseMessage } = response;
    if (responseCode === "00") {
      dispatch({ type: AUTH_REQUEST_SUCCESS, params });
    } else {
      throw new Error(responseMessage);
    }
  } catch (error) {
    let { message } = error;
    dispatch({ type: AUTH_REQUEST_FAILURE, error: { message } });
  }
};

export const onForgotPasswordAction = params => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_REQUEST_INIT });
    let response = await authService(forgotPasswordUrl, params);
    let { responseCode, responseMessage, responseDetails } = response;
    if (responseCode === "00") {
      let data = {};
      let param = params.email != undefined ? { emailId: params.email } : { mobileNumber: params.mobileNumber }
      dispatch({ type: AUTH_REQUEST_SUCCESS, data });
      dispatch(NavigationActions.navigate({ routeName: "resetPasswordRoute", params: param }));
    } else {
      throw new Error(responseMessage);
    }
  } catch (error) {
    let { message } = error;
    dispatch({ type: AUTH_REQUEST_FAILURE, error: { message } });
  }
};

export const onVerifyAndResetPasswordAction = params => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_REQUEST_INIT });
    let response = await authService(resetPasswordUrl, params);
    let { responseCode, responseMessage, responseDetails } = response;
    if (responseCode === "00") {
      let data = {};
      dispatch({ type: AUTH_REQUEST_SUCCESS, data });
      dispatch(NavigationActions.navigate({ routeName: "loginRoute" }));
    } else {
      throw new Error(responseMessage);
    }
  } catch (error) {
    let { message } = error;
    dispatch({ type: AUTH_REQUEST_FAILURE, error: { message } });
  }
};


export const onSessionExtension = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_REQUEST_INIT });
    let loginSessionId = await get(kLoginTokenKey),
      mobileNumber = await get(kLoggedInUserMobileNumberKey),
      userDetails = await get(kProfileInfoKey);
    response = await authService(sessionExtensionURL, { mobileNumber, loginSessionId });
    let { responseCode, responseMessage, responseDetails } = response;
    if (responseCode === "00") {
      let { loginSessionDetails } = responseDetails;
      await set(kLoginTokenKey, loginSessionDetails.loginSessionId);

      if (loginSessionDetails.loginSessionId && mobileNumber && userDetails) {
        userDetails = JSON.parse(userDetails);
        let data = { ...responseDetails, userDetails };
        dispatch({ type: AUTH_REQUEST_SUCCESS, data });
        dispatch(NavigationActions.navigate({ routeName: "homeRoute" }));
      }
      else {
        throw new Error("Not Logged In");
      }
    } else {
      throw new Error(responseMessage);
    }
  } catch (error) {

    removeAll();
    let { message } = error;
    dispatch({ type: AUTH_REQUEST_FAILURE, error: { message } });
    dispatch({ type: AUTH_CLEAR_ERROR });
    dispatch(NavigationActions.navigate({ routeName: "authRoute" }));

  }
};

/* export const onSessionExtension = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTH_REQUEST_INIT });
    let loginSessionId = await get(kLoginTokenKey),
      mobileNumber = await get(kLoggedInUserMobileNumberKey),
      userDetails = await get(kProfileInfoKey);

    if (loginSessionId && mobileNumber && userDetails) {
      userDetails = JSON.parse(userDetails);
      let loginSessionDetails = {
        loginSessionId: loginSessionId,
        loginSessionExpiryTime: "Fri Dec 21 05:42:07 IST 2018"
      };
      let data = { userDetails, loginSessionDetails };
      dispatch({ type: AUTH_REQUEST_SUCCESS, data });
      dispatch(NavigationActions.navigate({ routeName: "homeRoute" }));
      let params = {
        loginSessionId,
        mobileNumber
      };
      //TODO : API need to be provided
      // let response = await sessionExtensionService(params);
      // let { responseCode, responseMessage, responseDetails } = response;
      // if (responseCode === "00") {
      //   userDetails = JSON.parse(userDetails);
      //   let data = { ...responseDetails, userDetails };
      //   dispatch({ type: AUTH_REQUEST_SUCCESS, data });
      //   dispatch(navigateTo(dispatch, "homeRoute"));
      // } else {
      //   throw new Error(responseMessage);
      // }
    } else {
      throw new Error("Not Logged In");
    }
  } catch (error) {
    removeAll();
    let { message } = error;
    dispatch({ type: AUTH_REQUEST_FAILURE, error: { message } });
    dispatch({ type: AUTH_CLEAR_ERROR });
    dispatch(NavigationActions.navigate({ routeName: "authRoute" }));
  }
}; */
