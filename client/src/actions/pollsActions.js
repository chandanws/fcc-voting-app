export const REQUEST_POLLS = "REQUEST_POLLS";
const requestPolls = () => {
  return {
    type: REQUEST_POLLS
  };
};

export const RECEIVE_POLLS = "RECEIVE_POLLS";
const receivePolls = json => ({
  type: RECEIVE_POLLS,
  payload: json
});

export const fetchPolls = () => {
  return dispatch => {
    dispatch(requestPolls());
    return fetch("/polls")
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(receivePolls(json));
      });
  };
};
