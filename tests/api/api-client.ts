import { APIRequestContext } from 'playwright'
import { LoginDto } from '../dto/login-dto'
import { StatusCodes } from 'http-status-codes'
import { expect } from '@playwright/test'
import { OrderDto } from '../dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

export class ApiClient {
  static instance: ApiClient
  private request: APIRequestContext
  jwt: string = ''

  private constructor(request: APIRequestContext) {
    this.request = request
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(request)
      await this.instance.requestJwt()
    }
    return ApiClient.instance
  }

  private async requestJwt(): Promise<void> {
    console.log('Requesting JWT...')
    const authResponse = await this.request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectCredentials(),
    })
    // Check response status for negative cases
    if (authResponse.status() !== StatusCodes.OK) {
      console.log('Authorization failed')
      throw new Error(`Request failed with status ${authResponse.status()}`)
    }

    // Save the JWT token as a client property
    this.jwt = await authResponse.text()
    console.log('jwt received:')
    console.log(this.jwt)
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    console.log('Creating order...')
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithUndefinedOrderId(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    console.log('Order response: ', response)

    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    console.log('Order created: ')
    console.log(responseBody)

    return responseBody.id
  }

  // 3.1 Authorize + Create Order + Delete Order by ID With an API Client
  async createOrderAndReturnOrderID(): Promise<number> {
    console.log('Creating order...')
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithUndefinedOrderId(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.json()
    return responseBody.id
  }

  async getOrderById(orderId: number): Promise<any> {
    console.log(`Getting order with ID: ${orderId}`)
    const response = await this.request.get(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    expect(response.status()).toBe(StatusCodes.OK)
    return await response.json()
  }

  async deleteOrderById(orderId: number): Promise<void> {
    console.log(`Deleting order with ID: ${orderId}`)
    const response = await this.request.delete(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })
    expect(response.status()).toBe(StatusCodes.OK)
  }
}
