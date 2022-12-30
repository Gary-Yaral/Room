const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'Amino4cido'

/**
 * This function creates a valid token using jsonwebtoken library
 * @param {Object|Array} data 
 * @returns String Valid token
 */
const createToken = (data) => {
  return jwt.sign(data, SECRET)
}

/**
 * This function verifies if received token is valid 
 * @param {String} token Token to validate or to compare
 * @returns Data that token contains
 */
const verifyValidToken = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = { createToken, verifyValidToken }
