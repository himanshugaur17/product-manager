const express = require('express');
const productRoutes = require('./src/routes/routes.js')
const worker = require('./src/job/worker.js')
const app = express()
app.use(express.json())
app.listen(8080, () => {
    console.log('listening on port 8080');
})
app.use('/', productRoutes)
/* Global response-handler middleware */
app.use(req, res => {
    const data = res.locals
    res.json({
        data: data,
        isSuccess: true,
        status: 200
    });
})
/* Global error-handler middleware */
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.json({
        status: err.status || 500,
        message: err.message,
        isSuccess: false
    })
})

worker.run()
worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
});
worker.on('failed', (job, error) => {
    console.error(`Job ${job.id} failed with error ${error.message}`);
});

worker.on('error', (failedReason) => {
    console.error(failedReason)
})
