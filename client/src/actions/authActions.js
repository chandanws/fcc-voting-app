import { decodeJWT } from "../helpers/helpers";

export const CHECK_TOKEN_LOGIN = "CHECK_TOKEN_LOGIN";
const requestTokenLogin = login => {
  return {
    type: CHECK_TOKEN_LOGIN,
    payload: login
  };
};

export const REQUEST_LOGIN = "REQUEST_LOGIN";
const requestLogin = () => ({
  type: REQUEST_LOGIN
});

export const RECEIVE_LOGIN = "RECEIEVE_LOGIN";
export const receiveLogin = userData => ({
  type: RECEIVE_LOGIN,
  payload: userData
});

export const FAIL_LOGIN = "FAIL_LOGIN";
export const failLogin = message => ({
  type: FAIL_LOGIN,
  payload: message
});

export const fetchLogin = (username, password) => {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(`/auth/login`, {
      body: JSON.stringify({ username, password }),
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json"
      },
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // *client, no-referrer
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        const token = response.headers.get("authorization").split(" ")[1];
        localStorage.setItem("fcc-voting-app-token", token);
        const decoded = decodeJWT(token).data;
        dispatch(receiveLogin(decoded));
      } else {
        return response.json().then(json => {
          dispatch(failLogin(json.data.authorization));
        });
      }
    });
  };
};
