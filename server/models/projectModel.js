const mongoose = require("mongoose");
const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: false,
    },
    clientEmail: {
      type: String,
      required: false,
    },
    clientPhone: {
      type: Number,
      required: false,
    },
    duration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
