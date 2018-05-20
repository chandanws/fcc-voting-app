const router = require("express").Router();
const pollsController = require("./pollsController");

router.get("/", pollsController.polls_list);
router.post("/", pollsController.polls_create);
router.get("/:poll_id", pollsController.polls_detail);
router.put("/:poll_id", pollsController.polls_update);
router.put("/:poll_id", pollsController.polls_delete);

// TODO: bad URI to use /vote, check for better option, for now will do
router.put("/:poll_id/vote", pollsController.polls_vote);

module.exports = router;
