import { asyncFetch, endpoints } from "../../connectivity";
import { actionTypes } from "./enum";
let {
  TABTWO_REQUEST_INIT,
  TABTWO_REQUEST_SUCCESS,
  TABTWO_REQUEST_ERROR,
  TABTWO_REQUEST_LOAD_ERROR
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
const tabTwoService = async params => {
  try {
    let url = endpoints.getTabTwoURL;
    let payload = getRequestConfig(params);
    let response = await asyncFetch(url, payload);
    return response;
  } catch (error) {
    throw error;
  }
};


export const getTabTwoDataAction = params => async (dispatch, getState) => {
  let { auth, tabTwo } = getState();
  try {
    dispatch({ type: TABTWO_REQUEST_INIT });
    let args = {
      ...params
    };
    let response = await tabTwoService(args);
    let { responseCode, responseMessage, responseDetails } = response;
    if (params.utid != undefined) {
      dispatch(saveSelectedTerminal({ terminalId: params.utid }))
    }
    if (responseCode === "00") {
      let data = { ...tabTwo.data, ...responseDetails };
      dispatch({ type: TABTWO_REQUEST_SUCCESS, data });
    } else {
      throw Error(responseMessage);
    }
  } catch (error) {
    if (error.statusCode) {
      dispatch({ type: TABTWO_REQUEST_ERROR, error });
    } else {
      let errorMsg = error.message;
      dispatch({ type: TABTWO_REQUEST_LOAD_ERROR, errorMsg });
    }
  }
};
