const mongoose = require("mongoose");
//Create schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true
    },

    role: {
      type: String,
      enum: ['employee', 'manager'],
      default: "employee",
      // required: true
    },
    taskAssigned_referenceTo: {
      type: mongoose.SchemaTypes.ObjectId,
      //   required: true,
      ref: "Task",
    }, //one to one required
  },
  {
    timestamps: true,
  }
);
//Create and export model
const User = mongoose.model("User", userSchema);
module.exports = User;