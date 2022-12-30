/* We verify in which environment we are working */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
/* We import the general router */
const {router}= require('../routes')
/* We import the cors */
var {cors} = require('../helpers/handleCors')
/* We import express*/
const express = require('express')
/* We create one instance of express */
const app = express()

/* We add cors to give access to our api using this middleware */
app.use(cors)
app.use(express.json()) // This middleware transform the request to json 

/* We define the route of de api */ 
app.use('/api/v1.0', router)


module.exports = { app }