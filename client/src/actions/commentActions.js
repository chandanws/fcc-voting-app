export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
const requestComments = () => {
  return {
    type: REQUEST_COMMENTS
  };
};

export const RECEIEVE_COMMENTS = "RECEIEVE_COMMENTS";
const receiveComments = json => ({
  type: RECEIEVE_COMMENTS,
  payload: json
});

export const fetchComments = poll_id => {
  return dispatch => {
    dispatch(requestComments());
    return fetch(`/polls/${poll_id}/comments`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(receiveComments(json));
      });
  };
};
