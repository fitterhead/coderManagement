const mongoose = require("mongoose");
//Create schema

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "blah blah",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
      default: "pending",
    },

    isDeleted: {
      type: Boolean,
      default: false,
      immutable: true,
      // required: true
    },

    assignee: {
      type: mongoose.SchemaTypes.ObjectId,
      //   required: true,
      ref: "User",
    }, //one to one required
  },
  {
    timestamps: true,
  }
);
//Create and export model
const Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
