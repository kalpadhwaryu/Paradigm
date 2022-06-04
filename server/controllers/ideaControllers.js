const expressAsyncHandler = require("express-async-handler");
const Idea = require("../models/ideaModel");

// @desc    Get logged in user ideas
// @route   GET /api/ideas
// @access  Private
const getIdeas = expressAsyncHandler(async (req, res) => {
  const ideas = await Idea.find();
  res.json(ideas);
});

//@description     Fetch single Idea
//@route           GET /api/ideas/:id
//@access          Public
const getIdeaById = expressAsyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (idea) {
    res.json(idea);
  } else {
    res.status(404).json({ message: "Idea not found" });
  }
});

//@description     Create single Idea
//@route           GET /api/ideas/create
//@access          Private
const CreateIdea = expressAsyncHandler(async (req, res) => {
  const { title, content, category, duration } = req.body;

  if (!title || !content || !category || !duration) {
    res.status(400);
    throw new Error("Please fill all the fields");
    return;
  } else {
    const idea = new Idea({
      user: req.user._id,
      title,
      content,
      category,
      duration,
    });

    const createdIdea = await idea.save();

    res.status(201).json(createdIdea);
  }
});

//@description     Delete single Idea
//@route           GET /api/ideas/:id
//@access          Private
const DeleteIdea = expressAsyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (idea.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (idea) {
    await idea.remove();
    res.json({ message: "Idea Removed" });
  } else {
    res.status(404);
    throw new Error("Idea not Found");
  }
});

// @desc    Update a idea
// @route   PUT /api/ideas/:id
// @access  Private
const UpdateIdea = expressAsyncHandler(async (req, res) => {
  const { title, content, category, duration } = req.body;

  const idea = await Idea.findById(req.params.id);

  if (idea.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (idea) {
    idea.title = title;
    idea.content = content;
    idea.category = category;
    idea.duration = duration;

    const updatedIdea = await idea.save();
    res.json(updatedIdea);
  } else {
    res.status(404);
    throw new Error("Idea not found");
  }
});

module.exports = {getIdeas, getIdeaById, CreateIdea, DeleteIdea, UpdateIdea};
