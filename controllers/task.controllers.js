const { sendResponse, AppError } = require("../helpers/utils.js");
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task.js");
const taskController = {};

/* -------------------------------------------------------------------------- */
/*                               // create Task                               */
/* -------------------------------------------------------------------------- */
/**
 * @route POST API/task
 * @description create task
 * @access private
 */

taskController.createTask = async (req, res, next) => {
  const importedData = req.body;
  const errors = validationResult(req);
  console.log(errors, "error");
  try {
    // console.log(importedData, "importedData");
    const taskCreated = await Task.create(importedData);
    // console.log(taskCreated,"taskCreatedddd")

    console.log(body, "body");
    console.log(validationResult, "validationResult");
    sendResponse(res, 200, true, taskCreated, null, "TaskCreated");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                   Browse your tasks with filter allowance                  */
/* -------------------------------------------------------------------------- */
/**
 * @route GET API/task
 * @description Browse your tasks with filter allowance
 * @access private
 */

taskController.findTaskByFilter = async (req, res, next) => {
  const searchFilter = req.query;
  // const { name, status } = req.query;
  // console.log(name, "name");
  // console.log(status, "status");
  const queryArray = Object.keys(searchFilter);
  // console.log(queryArray, "queryArray");
  try {
    const findTaskByFilter = await Task.find(searchFilter).sort([
      ["createdAt", -1],
    ]);
    if (Object.keys(findTaskByFilter).length === 0) {
      throw new AppError(401, "Bad request", "cant find filter");
    }
    sendResponse(res, 200, true, findTaskByFilter, null, "taskByFilterfound");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                         find task decription by id                         */
/* -------------------------------------------------------------------------- */
/**
 * @route GET API/tasks/description
 * @description find task decription by id
 * @access private
 */

taskController.findDescriptionById = async (req, res, next) => {
  try {
    const searchFilter = req.body;
    console.log(searchFilter, "searchFilter");
    const errors = validationResult(req);
    if (!errors) throw new AppError(401, "Bad request", "id is not valid");
    // const findDescriptionById = await Task.findById(searchFilter);
    const findDescriptionById = await Task.findOne(searchFilter);

    const decription = await findDescriptionById.description;
    sendResponse(res, 200, true, decription, null, "findDescriptionByIdfound");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*             You could assign member to a task or unassign them             */
/* -------------------------------------------------------------------------- */
/**
 * @route PUT API/tasks/:id
 * @description You could assign member to a task or unassign them
 * @access private
 */

taskController.assignTaskToUser = async (req, res, next) => {
  const { assignee } = req.body;
  const { id } = req.params;
  try {
    console.log(assignee, "asignee");
    console.log(id, "employeeId");
    const errors = validationResult(req);
    if (!errors) throw new AppError(401, "Bad request", "cant assign task");
    let updateTask = await Task.findById(id);
    updateTask.assignee = assignee;
    console.log(updateTask.assignee, "update");
    updateTask = await updateTask.save();
    // const updated = await car.findByIdAndUpdate(targetId, updateInfo, options);
    sendResponse(res, 200, true, updateTask, null, "taskAssigned");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                          unassign member to a task                         */
/* -------------------------------------------------------------------------- */
/**
 * @route PUT API/tasks/:id
 * @description You could unassign them
 * @access private
 */

taskController.unassignTaskToUser = async (req, res, next) => {
  const { assignee } = req.body;
  const { id } = req.params;
  try {
    console.log(assignee, "asignee");
    console.log(id, "employeeId");
    const errors = validationResult(req);
    if (!errors) throw new AppError(401, "Bad request", "cant unassign task");
    let updateTask = await Task.findById(id);
    console.log(updateTask, "updateTask.assignee");
    if (updateTask.assignee.toString() === assignee) {
      updateTask.assignee = undefined;
    }
    updateTask = await updateTask.save();
    console.log(updateTask, "update");
    // const updated = await car.findByIdAndUpdate(targetId, updateInfo, options);
    sendResponse(res, 200, true, updateTask, null, "taskUnassigned");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                             update task status                             */
/* -------------------------------------------------------------------------- */
/**
 * @route PUT API/tasks/status/:id
 * @description update task status
 * @access private
 */

taskController.updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    let updateTask = await Task.findById(id);
    console.log(updateTask.status, "updateTask status");
    console.log(status, "status");
    console.log(id, "id");
    const errors = validationResult(req);
    if (!errors) throw new AppError(401, "Bad request", "cant update task");
    if (status === "pending" || status === "working" || status === "review") {
      if (updateTask.isDeleted === true) {
        console.log("status cant be updated");
      } else {
        updateTask.status = status;
      }
    } else {
      updateTask.status = status;
      updateTask.isDeleted = true;

      updateTask = await updateTask.save();
    }

    updateTask = await updateTask.save();
    sendResponse(res, 200, true, updateTask, null, "statusUpdated");
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*       6. You could search all tasks of 1 member either by name or id       */
/* -------------------------------------------------------------------------- */

/**
 * @route GET API/tasks/findtask/
 * @description You could search all tasks of 1 member
 * @access private
 */

taskController.findAllTaskOfMember = async (req, res, next) => {
  const data = req.query;
  try {
    console.log(data, "assignee");
    let taskList = await Task.find(data);
    const errors = validationResult(req);
    if (!errors)
      throw new AppError(
        401,
        "Bad request",
        "cant search all tasks of a staff"
      );
    console.log(taskList, "taskList");
    sendResponse(res, 200, true, null, taskList, "taskByFilterfound");
  } catch (error) {
    next(error);
  }
};

module.exports = taskController;
