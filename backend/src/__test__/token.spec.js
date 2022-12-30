const {describe, expect, test, afterAll} = require('@jest/globals');
const {app} = require('../app')
const { createToken} = require('../helpers/handleToken')
const {tokenData} = require('../utils/constants/tokenData')
const request = require('supertest')

describe('Validates the route to products', () => {
  const token = createToken(tokenData) 
  const auth = { 'Authorization': `Bearer ${token}`} 
  const route = '/api/v1.0/products'

  test('Validates status code 200', async() => {
    const result = await request(app).get(route).set(auth)
    expect(result.status).toBe(200)
  })

  test('Validates if request returns a object like response', async() => {
    const result = await request(app).get(route).set(auth)
    expect(result.headers['content-type']).toBeDefined()
    expect(result.headers['content-type'].search('application/json')).not.toBe(-1)
    expect(result.body).toBeInstanceOf(Object)
  })

})