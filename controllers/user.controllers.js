const { sendResponse, AppError } = require("../helpers/utils.js");
const { validationResult } = require("express-validator");

const User = require("../models/User.js");
const userController = {};

/* -------------------------------------------------------------------------- */
/*                               // create user                               */
/* -------------------------------------------------------------------------- */


userController.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  // const test = { name: "shinobu" };
  const data = req.body;
  // console.log(data, "data");
  console.log(errors, "data");
  if (!errors) throw new AppError(401, "Bad request", "no data");
  // if (!data) throw new AppError(401, "Bad request", "no data");

  try {
    const userCreated = await User.create(data);
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
  const queryArray = Object.keys(searchFilter);
  try {
    console.log(searchFilter, "searchFilter");
    console.log(queryArray, "queryArray");
    const getUserList = await User.find(searchFilter).sort([["createdAt", -1]]);
    sendResponse(res, 200, true, getUserList, null, "userListFind");
    //add more filter inside this part
  } catch (error) {
    next(error);
  }
};


module.exports = userController;
