import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { ApiClient } from './api/api-client'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test('successful authorization and order creation', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request) //already authorized
  const orderId = await apiClient.createOrderAndReturnOrderId() //await as it async
  expect.soft(orderId).toBeDefined()
})

// Task 3.1: Tests With an API Client -> Authorize + Get Order by ID:
test('authorize and get order by ID with API Client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderID()
  const order = await apiClient.getOrderById(orderId)
  expect(order.id).toBe(orderId)
  expect.soft(order.status).toMatch('OPEN')
  expect.soft(order.customerName).toBeDefined()
  expect.soft(order.comment).toBeDefined()
})
// Task 3.2: Tests With an API Client -> Authorize + Create Order + Delete Order by ID:
test('authorize and delete order by ID with API Client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderID()
  await apiClient.deleteOrderById(orderId)
  const getOrderResponse = await request.get(`${serviceURL}${orderPath}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${apiClient.jwt}`,
    },
  })
  expect(getOrderResponse.status()).toBe(StatusCodes.OK)
})

// Task 2.1: Tests Without an API Client -> Authorize + Get Order by ID:
test('authorize and get order by ID without API Client', async ({ request }) => {
  // Authorization
  const loginResponse = await request.post(`${serviceURL}${loginPath}`, {
    data: LoginDto.createLoginWithCorrectCredentials(),
  })
  expect(loginResponse.status()).toBe(StatusCodes.OK)
  const jwt = await loginResponse.text()

  // Creation of order
  const createOrderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: OrderDto.createOrderWithUndefinedOrderId(),
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(createOrderResponse.status()).toBe(StatusCodes.OK)
  const order = await createOrderResponse.json()

  // Get the order by ID
  const getOrderResponse = await request.get(`${serviceURL}${orderPath}/${order.id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(getOrderResponse.status()).toBe(StatusCodes.OK)
  const fetchedOrder = await getOrderResponse.json()
  expect(fetchedOrder.id).toBe(order.id)
})
// Task 2.2: Tests Without an API Client -> Authorize + Delete Order by ID:
test('authorize and delete order by ID without API Client', async ({ request }) => {
  // Authorize
  const loginResponse = await request.post(`${serviceURL}${loginPath}`, {
    data: LoginDto.createLoginWithCorrectCredentials(),
  })
  expect(loginResponse.status()).toBe(StatusCodes.OK)
  const jwt = await loginResponse.text()

  // Create an order
  const createOrderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: OrderDto.createOrderWithUndefinedOrderId(),
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(createOrderResponse.status()).toBe(StatusCodes.OK)
  const order = await createOrderResponse.json()

  // Delete the order by ID
  const deleteOrderResponse = await request.delete(`${serviceURL}${orderPath}/${order.id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(deleteOrderResponse.status()).toBe(StatusCodes.OK)

  // Verify the order was deleted
  const getOrderResponse = await request.get(`${serviceURL}${orderPath}/${order.id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(getOrderResponse.status()).toBe(StatusCodes.OK)
})
