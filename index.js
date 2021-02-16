const express = require('express')
const morgan = require('morgan')
const app = express()
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' });
require('./config/Db')
app.use(express.json())
app.use('/public',express.static('public')); // public folder
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1/job', require('./routes/Jobs'))
app.use('/api/v1', require('./routes/auth'))
app.use('/api/v1/user', require('./routes/user'))

app.listen(process.env.PORT, console.log(` SERVER IS RUNNING ON PORT ${process.env.PORT}`))