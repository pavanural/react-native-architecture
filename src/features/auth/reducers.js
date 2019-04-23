import { actionTypes } from "./enum";
const {
  AUTH_REQUEST_INIT,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_FAILURE,
  AUTH_CLEAR_ERROR,
  AUTH_RESET_STATE,
  AUTH_SELECTED_TERMINAL
} = actionTypes;

const initialState = {
  loading: false,
  error: null,
  data: {},
  selected: null
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST_INIT:
      return {
        ...state,
        loading: true
      };

    case AUTH_REQUEST_SUCCESS:
      return {
        loading: false,
        error: null,
        data: { ...state.data, ...action.data }
      };

    case AUTH_REQUEST_FAILURE:
      return {
        loading: false,
        error: action.error,
        data: { ...state.data }
      };

    case AUTH_CLEAR_ERROR:
      return { ...state, error: null };

    case AUTH_RESET_STATE:
      return { ...initialState };

    case AUTH_SELECTED_TERMINAL:
      return {
        loading: false,
        error: null,
        data: { ...state.data },
        selected: action.terminalId
      };

    default:
      return state;
  }
};
