import { TaskModel } from "../models/taskModel.js";

export const getTasks = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const tasks = await TaskModel.getAll({ status, limit, offset });

    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await TaskModel.getById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await TaskModel.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updated = await TaskModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await TaskModel.delete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};