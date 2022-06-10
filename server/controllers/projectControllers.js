const expressAsyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// @desc    Get logged in user projects
// @route   GET /api/projects
// @access  Private
const getProjects = expressAsyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

//@description     Fetch single Project
//@route           GET /api/projects/:id
//@access          Public
const getProjectById = expressAsyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

//@description     Create single Project
//@route           GET /api/projects/create
//@access          Private
const CreateProject = expressAsyncHandler(async (req, res) => {
  const {
    title,
    content,
    category,
    duration,
    clientName,
    clientEmail,
    clientPhone,
    status,
  } = req.body;

  if (
    !title ||
    !content ||
    !category ||
    !duration ||
    !status
  ) {
    res.status(400);
    throw new Error("Please fill all the fields");
    return;
  } else {
    const project = new Project({
      user: req.user._id,
      title,
      content,
      category,
      duration,
      clientName,
      clientEmail,
      clientPhone,
      status,
    });

    const createdProject = await project.save();

    res.status(201).json(createdProject);
  }
});

//@description     Delete single Project
//@route           GET /api/projects/:id
//@access          Private
const DeleteProject = expressAsyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (project) {
    await project.remove();
    res.json({ message: "Project Removed" });
  } else {
    res.status(404);
    throw new Error("Project not Found");
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const UpdateProject = expressAsyncHandler(async (req, res) => {
  const {
    title,
    content,
    category,
    duration,
    clientName,
    clientEmail,
    clientPhone,
    status,
  } = req.body;

  const project = await Project.findById(req.params.id);

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (project) {
    project.title = title;
    project.content = content;
    project.category = category;
    project.duration = duration;
    project.clientName = clientName;
    project.clientEmail = clientEmail;
    project.clientPhone = clientPhone;
    project.status = status;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

module.exports = {
  getProjects,
  getProjectById,
  CreateProject,
  DeleteProject,
  UpdateProject,
};
