import { asyncFetch, endpoints } from "../../connectivity";
import { actionTypes } from "./enum";
let {
  TABONE_REQUEST_INIT,
  TABONE_REQUEST_SUCCESS,
  TABONE_REQUEST_ERROR,
  TABONE_REQUEST_LOAD_ERROR
} = actionTypes;


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
const tabOneService = async params => {
  try {
    let url = endpoints.getTabOneURL;
    let payload = getRequestConfig(params);
    let response = await asyncFetch(url, payload);
    return response;
  } catch (error) {
    throw error;
  }
};


export const getTabOneDataAction = params => async (dispatch, getState) => {
  let { auth, tabOne } = getState();
  try {
    dispatch({ type: TABONE_REQUEST_INIT });
    let args = {
      ...params
    };
    let response = await tabOneService(args);
    let { responseCode, responseMessage, responseDetails } = response;
    if (params.utid != undefined) {
      dispatch(saveSelectedTerminal({ terminalId: params.utid }))
    }
    if (responseCode === "00") {
      let data = { ...tabOne.data, ...responseDetails };
      dispatch({ type: TABONE_REQUEST_SUCCESS, data });
    } else {
      throw Error(responseMessage);
    }
  } catch (error) {
    if (error.statusCode) {
      dispatch({ type: TABONE_REQUEST_ERROR, error });
    } else {
      let errorMsg = error.message;
      dispatch({ type: TABONE_REQUEST_LOAD_ERROR, errorMsg });
    }
  }
};
