exports.polls_list = (req, res) => {
  res.status(200);
  res.set("Content-Type", "application/json");
  res.json({ status: "success", data: [] });
};

exports.polls_detail = (req, res) => {
  res.send("polls_detail: NOT IMPPLEMENTED");
};

exports.polls_create = (req, res) => {
  res.send("polls_create: NOT IMPLEMENTED");
};

exports.polls_delete = (req, res) => {
  res.send("polls_delete: NOT IMPLEMENTEd");
};

exports.polls_update = (req, res) => {
  res.send("polls_update: NOT IMPLEMENETED");
};

exports.polls_vote = (req, res) => {
  res.send("polls_vote: NOT IMPLEMENETED");
};
