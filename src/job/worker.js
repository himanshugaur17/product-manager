const { Worker } = require('bullmq')
const { bulkUpload } = require('../service/productManagerService.js')
require('dotenv').config();
const workerOptions = {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    removeOnComplete: {
        age: 12 * 3600,
        count: 1000,
    },
    removeOnFail: {
        age: 24 * 3600,
    },
};
const worker = new Worker('productCreateQueue', async (job) => {
    console.log(`Job with id ${job.id} dequeued`)
    try {
        await bulkUpload(job)
    }
    catch (err) {
        console.log(err)
        return;
    }
    console.log(`Job with id ${job.id} finished`)
}, workerOptions)

module.exports = worker