const router = require("express").Router();
const pollsController = require("./pollsController");
const auth = require("../middleware").auth;

router.get("/", pollsController.polls_list);
router.post("/", auth.authenticationRequired, pollsController.polls_create);
router.get("/:poll_id", pollsController.polls_detail);
router.put(
  "/:poll_id",
  auth.authenticationRequired,
  pollsController.polls_update
);
router.delete(
  "/:poll_id",
  auth.authenticationRequired,
  pollsController.polls_delete
);

// TODO: bad URI to use /vote, check for better option, for now will do
router.put("/:poll_id/vote", pollsController.polls_vote);

router.get("/:poll_id/comments", pollsController.polls_comments_list);

module.exports = router;
