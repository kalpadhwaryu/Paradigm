const express = require("express");
const {
  getProjects,
  getProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
} = require("../controllers/projectControllers");
const { protect } = require("../middlewares/authMW");
const router = express.Router();

router.route("/").get(protect, getProjects);
router
  .route("/:id")
  .get(getProjectById)
  .delete(protect, DeleteProject)
  .put(protect, UpdateProject);
router.route("/create").post(protect, CreateProject);

module.exports = router;
