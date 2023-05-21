import { SET_TOKEN, REMOVE_TOKEN, SET_RESULTS, SET_DOCUMENTS_IDS } from "./types";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("accesToken"),
  results: null,
  documentIds: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case REMOVE_TOKEN:
      Cookies.remove("accessToken");
      return {
        ...state,
        token: null,
      };
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    case SET_DOCUMENTS_IDS:
      return {
        ...state,
        documentIds: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
