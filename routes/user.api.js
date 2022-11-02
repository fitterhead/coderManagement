const express = require("express");
const {
  createUser,
  getUser,
  getEmployeeByName,
  searchUserTask,
} = require("../controllers/user.controllers");
const router = express.Router();
const { body, validationResult } = require("express-validator");

/* ------ 1) Create a new user by user’s name. default role is employee ----- */
router.post("/", body("name").exists().isString(), createUser);

/* --------------- 2) Browse for all your employee with filter -------------- */
router.get("/", body("name").exists(), getUser);

/* ----------------------- 3) find employee with name ----------------------- */
router.get("/employee", getEmployeeByName);

/* ------- you could search all tasks of 1 member either by name or id ------ */
router.get("/taskassigned", body("_id").exists().isMongoId(), searchUserTask);

module.exports = router;
