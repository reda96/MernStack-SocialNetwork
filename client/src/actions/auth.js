import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
  try {
    const newUser = { name, email, password };
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(newUser);
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const err = error.response.data.errors;
    if (err) {
      err.array.forEach(e => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};
