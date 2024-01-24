const express = require('express');
const router = express.Router();
const { createTask, completeTask, updateTask, deleteTask, getAllTasks } = require('../controllers/taskContr');

router.post('/create/:userId', createTask);
router.patch('/complete/:taskId', completeTask);
router.patch('/update/:taskId', updateTask);
router.patch('/delete/:id', deleteTask);
router.get('/get', getAllTasks);

module.exports = router;