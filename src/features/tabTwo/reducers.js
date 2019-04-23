import { actionTypes } from "./enum";
let {
  TABTWO_REQUEST_INIT,
  TABTWO_REQUEST_SUCCESS,
  TABTWO_REQUEST_ERROR,
  TABTWO_REQUEST_RESET,
  TABTWO_REQUEST_LOAD_ERROR
} = actionTypes;

const initialState = {
  loadError: null,
  loading: false,
  error: null,
  data: {}
};
export const tabTwo = (state = initialState, action) => {
  switch (action.type) {
    case TABTWO_REQUEST_INIT:
      return {
        loading: true,
        error: null,
        loadError: null,
        data: {}
      };

    case TABTWO_REQUEST_SUCCESS:
      return {
        loading: false,
        error: null,
        loadError: null,
        data: { ...state.data, ...action.data }
      };

    case TABTWO_REQUEST_ERROR:
      return {
        loading: false,
        error: action.error.message,
        data: { ...state.data },
        loadError: null
      };

    case TABTWO_REQUEST_LOAD_ERROR:
      return {
        data: { ...state.data },
        loading: false,
        error: null,
        loadError: action.errorMsg
      };

    case TABTWO_REQUEST_RESET:
      return initialState;

    default:
      return state;
  }
};
