const { Queue } = require('bullmq')
require('dotenv').config();
const redisConfig = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
}
const queue = new Queue('productCreateQueue', redisConfig)
const addJob = async (job) => await queue.add('productCreation', job);