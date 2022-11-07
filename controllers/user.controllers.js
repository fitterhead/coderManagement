const { sendResponse, AppError } = require("../helpers/utils.js");
const { validationResult } = require("express-validator");

const User = require("../models/User.js");
const userController = {};

/* -------------------------------------------------------------------------- */
/*                               // create user                               */
/* -------------------------------------------------------------------------- */

userController.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(errors, "errors");
    if (errors.length) throw new AppError(401, "Bad request", "invalid input");
    const allowUpdate = ["name", "role"];
    const updates = req.body;
    const updateKeys = Object.keys(updates);
    const notAllow = updateKeys.filter((el) => !allowUpdate.includes(el));
    if (notAllow.length) {
      throw new AppError(401, "Bad request", "filter Input is not validated");
    }
    const userCreated = await User.create(updates);
    sendResponse(res, 200, true, userCreated, null, "userCreated");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                         //get all user with filter:                        */
/* -------------------------------------------------------------------------- */

userController.getUser = async (req, res, next) => {
  const searchFilter = req.query;
  try {
    const getUserList = await User.find(searchFilter).sort([["createdAt", -1]]);
    sendResponse(res, 200, true, getUserList, null, "userListFind");
    //add more filter inside this part
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
