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

export const REQUEST_POLL_VOTE = "REQUEST_POLL_VOTE";
export const requestPollVote = () => ({
  type: REQUEST_POLL_VOTE
});

export const RECEIVE_POLL_VOTE = "RECEIVE_POLL_VOTE";
export const receivePollVote = () => ({
  type: RECEIVE_POLL_VOTE
});

export const initiatePollVote = (poll_id, option_id) => {
  return dispatch => {
    dispatch(requestPollVote());
    return fetch(`/polls/${poll_id}/vote`, {
      body: JSON.stringify({ option_id }),
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json"
      },
      method: "PUT",
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // *client, no-referrer
    }).then(response => {
      console.log(response);
      dispatch(receivePollVote());
    });
  };
};
