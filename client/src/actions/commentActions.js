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

export const REQUEST_MAKE_COMMENT = "REQUEST_MAKE_COMMENT";
export const requestMakeComment = () => ({
  type: REQUEST_MAKE_COMMENT
});

export const FAIL_MAKE_COMMENT = "FAIL_MAKE_COMMENT";
export const failMakeComment = message => ({
  type: FAIL_MAKE_COMMENT,
  payload: message
});

export const SUCCESS_MAKE_COMMENT = "SUCCESS_MAKE_COMMENT";
export const successMakeComment = () => ({
  type: SUCCESS_MAKE_COMMENT
});

export const fetchMakeComment = (poll_id, parent_id, text) => {
  return dispatch => {
    dispatch(requestMakeComment());
    return fetch(`/polls/${poll_id}/comments`, {
      body: JSON.stringify({ parent_id, text }),
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
    }).then(response => {
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        dispatch(successMakeComment());
        dispatch(fetchComments(poll_id));
      } else {
        return response.json().then(json => console.log(json));
      }
    });
  };
};

export const REQUEST_COMMENT_EDIT = "REQUEST_COMMENT_EDIT";
export const requestCommentEdit = () => ({
  type: REQUEST_COMMENT_EDIT
});

export const FAIL_COMMENT_EDIT = "FAIL_COMMENT_EDIT";
export const failCommentEdit = message => ({
  type: FAIL_COMMENT_EDIT,
  payload: message
});

export const SUCCESS_COMMENT_EDIT = "SUCCESS_COMMENT_EDIT";
export const successCommentEdit = () => ({
  type: SUCCESS_COMMENT_EDIT
});

export const fetchCommentEdit = (poll_id, comment_id, text) => dispatch => {
  dispatch(requestCommentEdit());
  return fetch(`/polls/${poll_id}/comments/${comment_id}`, {
    body: JSON.stringify({ text }),
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("fcc-voting-app-token")}`
    },
    method: "PUT",
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  })
    .then(response => {
      dispatch(fetchComments(poll_id));
    })
    .catch(e => {
      console.log(e);
    });
};
