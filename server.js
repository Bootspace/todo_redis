const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./database/models');
const redisClient = require('./utils/redis');


const app = require('./app');
const port = process.env.PORT || 5000;


async function dbSync() {
  const syncModels = await sequelize.sync({ alter: true });
  syncModels ? console.log('Database connected and Models synced') : console.log('Failed to sync models');
};

async function redisConn() {
  const redisConn = await redisClient.connect();
  redisConn ? console.log('Redis connected') : console.log('redis failed to connect');
};



const server = app.listen(port, () => {
  dbSync();
  redisConn();
  console.log(`App running on Port: ${port}`);
  console.log(process.env.NODE_ENV);
});