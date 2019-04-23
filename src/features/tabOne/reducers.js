import { actionTypes } from "./enum";
let {
  TABONE_REQUEST_INIT,
  TABONE_REQUEST_SUCCESS,
  TABONE_REQUEST_ERROR,
  TABONE_REQUEST_RESET,
  TABONE_REQUEST_LOAD_ERROR
} = actionTypes;

const initialState = {
  loadError: null,
  loading: false,
  error: null,
  data: {}
};
export const tabOne = (state = initialState, action) => {
  switch (action.type) {
    case TABONE_REQUEST_INIT:
      return {
        loading: true,
        error: null,
        loadError: null,
        data: {}
      };

    case TABONE_REQUEST_SUCCESS:
      return {
        loading: false,
        error: null,
        loadError: null,
        data: { ...state.data, ...action.data }
      };

    case TABONE_REQUEST_ERROR:
      return {
        loading: false,
        error: action.error.message,
        data: { ...state.data },
        loadError: null
      };

    case TABONE_REQUEST_LOAD_ERROR:
      return {
        data: { ...state.data },
        loading: false,
        error: null,
        loadError: action.errorMsg
      };

    case TABONE_REQUEST_RESET:
      return initialState;

    default:
      return state;
  }
};
