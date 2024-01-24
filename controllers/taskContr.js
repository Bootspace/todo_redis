const { Task, Op } = require('../database/models');
const { logger } = require('../utils/logging');
const redisClient = require('../utils/redis');

exports.createTask = async(req, res) => {
  try {
    const userId = req.params.userId;
    const { title, description, dueDate } = req.body;
    const newTask = await Task.create({title,description,dueDate,userId});

    await redisClient.set(newTask.id, JSON.stringify(newTask));

    return logger(201, newTask, "success", res);

  } catch (error) {
    return logger(500, error.message, "failed", res);
  }
};

exports.completeTask= async(req, res) => {
  try {
      let cachedData = await redisClient.get(req.params.taskId);
      if(cachedData) {
        redisClient.del(req.params.taskId)
      };

      const updatedTask = await Task.update({ completed: true}, {
        where: { id: req.params.taskId }
      });
      await redisClient.set(req.params.id, JSON.stringify(updatedTask));
      return logger(200, "task completed", "success", res);
  } catch (error) {
    return logger(500, error.message, "failed", res);
  }
};

exports.updateTask = async(req, res) => {
  try {
    const filter = req.body;
    if(cachedData) {
      redisClient.del(req.params.taskId)
    };
    const updatedTask = await Task.update(filter, {
      where: { id: req.params.taskId }
    });
    await redisClient.set(req.params.id, JSON.stringify(updatedTask));

    return logger(200, "task updated", "success", res);
  } catch (error) {
    return logger(500, error.message, "failed", res);
  }
};

exports.deleteTask = async(req, res) => {
  try {
    const id = req.params.id;
    await redisClient.del(id);
    Task.destroy({where: {
      id
    }})
    .then((deletedRows) => {
      if (deletedRows > 0) {
        return logger(204,`Task with id ${taskId} deleted successfully.`, "success", res);
      } else {
        return logger(404,`Task with id ${taskId} not found or not deleted.`, "failed", res);
      }
    })
  } catch (error) {
    return logger(500, error.message, "failed", res); 
  }
}

exports.getAllTasks = async (req, res) => {
  try {
    // Pagination
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const offset = (page - 1) * pageSize;

    // Sorting
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'ASC';

    // Filtering
    const filter = req.query.filter || '';

    const tasks = await Task.findAndCountAll({
      where: {
        // Add your filtering conditions here
        title: {
          [Op.iLike]: `%${filter}%`, // Case-insensitive like for title
        },
      },
      order: [[sortBy, sortOrder]],
      offset,
      limit: pageSize,
    });

    return logger(200, tasks, "success", res);
  } catch (error) {
    return logger(500, error.message, "failed", res);
  }
};