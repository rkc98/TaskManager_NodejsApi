const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middlewares/Auth");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.send(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const task = await Task.find({ owner: req.user._id });
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const result = await Task.findById(_id);
    console.log(req.user._id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    console.log(task);
    if (!task) {
      return res.status(400).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["description", "completed"];
  const isValid = updates.every((update) => allowed.includes(update));
  if (!isValid) {
    return res.status(400).send({
      message: "updated not allowed",
    });
  }

  const id = req.params.id;
  try {
    const task = await Task.findOne({ _id: id, owner: req.user._id });

    updates.forEach((update) => {
      task[update] = req.body[update]; // this is equivalent to task.update=req.body.update but in a dynmaic manner []
    });
    await task.save();
    if (!task) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Task.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({
      message: error,
    });
  }
});
router.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Task.findByIdAndDelete(id, { new: true });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({
      message: error,
    });
  }
});

module.exports = router;
