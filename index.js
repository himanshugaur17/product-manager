const express = require('express');
const productRoutes = require('./src/routes/routes.js')
const app = express()
app.use(express.json())
app.listen(8080, () => {
    console.log('listening on port 8080');
})
app.use('/', productRoutes)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.json({
        status: err.status,
        message: err.message,
        isSuccess: false
    })
})
