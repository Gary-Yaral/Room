const {describe, expect, test} = require('@jest/globals');
const {hasAuthorization} = require('../utils/functions/validateAuth')
const { createToken} = require('../helpers/handleToken')

describe('Authorization', () => {
  const tokenData = {
    mail: 'backend@projuniors.com',
    company: 'ProJunior'
  }
  
  const token = createToken(tokenData) 
  const req = { headers:{ 'Authorization': `Bearer ${token}`} }
  const tokenExists = hasAuthorization(req)
  
  test('Returns a object', async() => {
    expect(tokenExists).toBeInstanceOf(Object)
  })

  test('Verifies if token was sended', async() => {
    expect(tokenExists.isValid).toBeTruthy()
  })
})