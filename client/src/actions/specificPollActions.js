export const REQUEST_SPECIFIC_POLL = "REQUEST_SPECIFIC_POLL";
const requestSpecificPoll = () => {
  return {
    type: REQUEST_SPECIFIC_POLL
  };
};

export const RECEIVE_SPECIFIC_POLL = "RECEIVE_SPECIFIC_POLL";
const receiveSpecificPoll = json => ({
  type: RECEIVE_SPECIFIC_POLL,
  payload: json
});

export const fetchSpecificPoll = poll_id => {
  return dispatch => {
    dispatch(requestSpecificPoll());
    return fetch(`/polls/${poll_id}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(receiveSpecificPoll(json));
      });
  };
};
