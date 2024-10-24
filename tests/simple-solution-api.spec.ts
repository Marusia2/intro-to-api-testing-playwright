import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'
//import { LoanApplication } from './dto/loan-application'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with incorrect id should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with correct data should receive code 200', async ({ request }) => {
  const orderDto = OrderDto.createOrderWithCorrectRandomData()
  orderDto.customerName = 'Sam' //fields are not private, so you may modify them
  // prepare request body
  //const orderDto = new OrderDto("OPEN", 0, "Matt", "+377777777", "testing", 0)
  //const orderDto = OrderDto.createOrderWithCorrectRandomData() // no "new" because it's static method, and it's called from class name !!!!

  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    //data: OrderDto.createOrderWithCorrectRandomData() //called from class not from object. No "New" as it is private
    data: orderDto,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.status).toBe('OPEN')
  expect.soft(responseBody.customerName).toBe('Sam')
})

test('post order with incorrect data should receive code 400', async ({ request }) => {
  // prepare request body
  //const orderDto = new OrderDto("CLOSED", 0, "Matt", "+377777777", "testing", 0)

  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: OrderDto.createOrderWithIncorrectRandomData(),
  })
  // Log the response status and body
  console.log('response status:', response.status())
  //console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// 9 Assignment
// PUT request. Update an order by providing correct data should receive code 200
test('put order with correct data should receive code 200', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 1,
  }
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// PUT request. Update an order by providing correct data but for the unauthorized user should receive code 401
test('put order with correct data but unauthorized user should receive code 401', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 1,
  }

  const requestHeaders = { api_key: ' ' }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })

  console.log('response status:', response.status())
  //console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED) //???????
})

// PUT request.  Update an order with incorrect ID data but the authorized user should receive code 400
test('put order with incorrect ID data but unauthorized user should receive code 400', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Peter',
    customerPhone: '+371112222',
    comment: 'test',
    id: 'incorrect_ID',
  }
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })

  console.log('response status:', response.status())
  // console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// DELETE request. Delete an order by providing correct data should receive code 204
test('delete order with correct data should receive code 204', async ({ request }) => {
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })

  console.log('response status:', response.status())
  //console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT) //VERY STRANGE LOGIC IMPLEMENTED 204
})

// DELETE request. Delete an order for the unauthorized user should receive code 401
test('delete order for unauthorized user should receive code 401', async ({ request }) => {
  const requestHeaders = { api_key: ' ' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })

  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

// DELETE request. Delete order by providing an invalid order ID should receive code 400
test('delete order with invalid order ID should receive code 400', async ({ request }) => {
  const requestHeaders = { api_key: '1234567890123456' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/0', {
    headers: requestHeaders,
  })

  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// GET request. Login with a valid username and password should receive code 200 and API key
test('Get order with correct data should receive code 200', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=Peter&password=password',
    {},
  )

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// GET request. Login with missing username and password data should receive code 500
test('Get order with missing data should receive code 500', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {})

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
