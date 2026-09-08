
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const orderRoutes = require('./routes/orders')
const seaPortRoutes = require('./routes/seaPorts')
const cors = require('cors') //added cors 
//as was blocking sea port search
const app = express()


//middleware
app.use(cors())
app.use(express.json())



app.get("/", (req, res) => {
    res.json({message: 'Welcome'})
})

//grabbing different routes from orders.js
app.use('/api/order/',orderRoutes)
app.use('/api/seaports', seaPortRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
    console.log('Connected and Listening on port 8000!')
})
})


