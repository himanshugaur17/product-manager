const { Worker } = require('bullmq')
const { bulkUpload } = require('../service/productManagerService.js')
require('dotenv').config();
const workerOptions = {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
};

const worker = new Worker('asyncProductCreator', async (job) => {
    console.log(`Job with id ${job.id} dequeued`)
    await bulkUpload(job)
    console.log(`Job with id ${job.id} finished`)
}, workerOptions)