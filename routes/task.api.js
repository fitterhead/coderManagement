const express = require("express");
const {
  body,
  validationResult,
  oneOf,
  param,
  query,
} = require("express-validator");
const {
  createTask,
  findTaskByFilter,
  findDescriptionById,
  assignTaskToUser,
  unassignTaskToUser,
  updateStatus,
  findAllTaskOfMember,
} = require("../controllers/task.controllers");
const router = express.Router();

/* ------ 1) Create a new task ----- */
/**
 * @route POST API/tasks
 * @description create task
 * @access private
 * @example https://coderschoolmanagement.herokuapp.com/tasks
 */
router.post("/", body("name").exists(), createTask);

/* ----------------- Browse your tasks with filter allowance ---------------- */
/**
 * @route GET API/tasks
 * @description browse task
 * @access private
 * @example GET https://coderschoolmanagement.herokuapp.com/tasks
 */

router.get("/", query().exists(), findTaskByFilter);

/* ----------------------- find task decription by id ----------------------- */
/**
 * @route GET API/tasks/:id
 * @description create task
 * @access private
 * @example https://coderschoolmanagement.herokuapp.com/tasks/description/636135bdc85afe8dca032827
 */

router.get(
  "/description/:id",
  oneOf([param().exists().isMongoId(), body("name").exists().isString()]),
  findDescriptionById
);

/* ----------- You could assign member to a task or unassign them ----------- */
/**
 * @route PUT API/tasks/assign/:id
 * @description You could assign member to a task or unassign them
 * @access private
 * @example https://coderschoolmanagement.herokuapp.com/tasks/assign/635f47109494bad07a2f2d3d
 */

router.put(
  "/assign/:id",
  oneOf([body("assignee").exists().isMongoId(), param().exists().isString()]),
  assignTaskToUser
);

/**
 * @route PUT API/tasks/assign/:id
 * @description You could unassign member to a task or unassign them
 * @access private
 * @example https://coderschoolmanagement.herokuapp.com/tasks/unassign/635f47109494bad07a2f2d3d
 */

router.delete(
  "/unassign/:id",
  oneOf([body("assignee").exists().isMongoId(), param().exists().isString()]),
  unassignTaskToUser
);

/* --------------------------- update task status --------------------------- */
/**
 * @route PUT API/tasks/status/:id
 * @description update task status
 * @access private
*
 */

router.put(
  "/status/:id",
  oneOf([body("status").exists(), param().exists().isString()]),
  updateStatus
);

/* ----- 6. You could search all tasks of 1 member by id ----- */
/**
 * @route POST API/task
 * @description create task
 * @access private
 */

router.get(
  "/findtask",
  // query().exists(),
  findAllTaskOfMember
);

module.exports = router;
