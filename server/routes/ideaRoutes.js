const express = require("express");
const {
  getIdeas,
  getIdeaById,
  CreateIdea,
  UpdateIdea,
  DeleteIdea,
} = require("../controllers/ideaControllers");
const { protect } = require("../middlewares/authMW");
const router = express.Router();

router.route("/").get(protect, getIdeas);
router
  .route("/:id")
  .get(getIdeaById)
  .delete(protect, DeleteIdea)
  .put(protect, UpdateIdea);
router.route("/create").post(protect, CreateIdea);

module.exports = router;
