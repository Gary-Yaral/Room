const { app } = require('./app');
/**
 * Port where our service will work
 * @type Number
 */
const port = process.env.PORT || 6500

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})