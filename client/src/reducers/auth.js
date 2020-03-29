import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthinticated: null,
  loading: true,
  user: null
};
export default function(state = { initialState }, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case AUTH_ERROR:
      localStorage.setItem("token", payload);
      return {
        ...state,
        ...payload,
        isAuthinticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthinticated: false,
        loading: false
      };
    default:
      return state;
  }
}
