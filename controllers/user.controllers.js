const { sendResponse, AppError } = require("../helpers/utils.js");
const { validationResult } = require("express-validator");

const User = require("../models/User.js");
const userController = {};

/* -------------------------------------------------------------------------- */
/*                               // create user                               */
/* -------------------------------------------------------------------------- */
/**
 * @route GET API/users
 * @description create user
 * @access private
 */

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
/**
 * @route GET API/users?filter
 * @description get all user with filter
 * @access public
 */

userController.getUser = async (req, res, next) => {
  try {
    const searchFilter = req.query;
    const getUserList = await User.find(searchFilter).sort(["createdAt", -1]);
    sendResponse(res, 200, true, getUserList, null, "userListFind");
    //add more filter inside this part
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                       Search for an employee by name                       */
/* -------------------------------------------------------------------------- */
/**
 * @route GET API/users
 * @description Search for an employee by name
 * @access private
 */


userController.getEmployeeByName = async (req, res, next) => {
  try {
    const searchFilter = req.body;
    const errors = validationResult(req);
    if (!errors) throw new AppError(401, "Bad request", "cant find user");
    const getEmployeeByName = await User.findOne(searchFilter);
    sendResponse(res, 200, true, getEmployeeByName, null, "EmployeeByNameFind");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*         you could search all tasks of 1 member either by name or id        */
/* -------------------------------------------------------------------------- */
/**
 * @route GET API/users/:id
 * @description you could search all tasks of 1 member either by name or id
 * @access private
 */

userController.searchUserTask = async (req, res, next) => {
  try {
    const searchFilter = req.body;
    const errors = validationResult(req);
    if (!errors) throw new AppError(401, "Bad request", "request is not valid");
    const searchUserTask = await User.findById(searchFilter);
    const userTask = await searchUserTask.taskAssigned_referenceTo;
    sendResponse(res, 200, true, userTask, null, "searchUserTaskfound");
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
