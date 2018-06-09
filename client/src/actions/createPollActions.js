import history from "../history";

export const REQUEST_POLL_CREATE = "REQUEST_POLL_CREATE";
export const requestPollCreate = () => ({
  type: REQUEST_POLL_CREATE
});

export const SUCCESS_POLL_CREATE = "SUCCESS_POLL_CREATE";
export const successPollCreate = () => {
  return {
    type: SUCCESS_POLL_CREATE
  };
};

export const FAIL_POLL_CREATE = "FAIL_POLL_CREATE";
export const failPollCreate = message => ({
  type: FAIL_POLL_CREATE,
  payload: message
});

export const fetchPollCreate = (title, options) => {
  return dispatch => {
    dispatch(requestPollCreate());
    return fetch(`/polls`, {
      body: JSON.stringify({ title, options }),
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("fcc-voting-app-token")}`
      },
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // *client, no-referrer
    })
      .then(response => {
        console.log(response);
        return response.headers.get("location");
      })
      .then(location => {
        dispatch(successPollCreate());
        history.push(location);
      });
  };
};
