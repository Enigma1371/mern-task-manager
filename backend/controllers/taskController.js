// backend/controllers/taskController.js
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
const { name, description, dueDate, priority, status } = req.body;
try {
    const newTask = new Task({
    user: req.user.id,
    name,
    description,
    dueDate,
    priority,
    status,
    });
    const task = await newTask.save();
    res.json(task);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
};

exports.getTasks = async (req, res) => {
try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
};

exports.updateTask = async (req, res) => {
const { name, description, dueDate, priority, status } = req.body;
try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
    }

    task = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: { name, description, dueDate, priority, status } },
    { new: true }
    );

    res.json(task);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
};

exports.deleteTask = async (req, res) => {
try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
};
