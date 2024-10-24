import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'

test('incorrect username and password return 401 ', async ({
                                                                                       request,
                                                                                     }) => {
  const loginDto =
    LoginDto.createLoginWithIncorrectCredentials()

  const response = await request.post(
    `${serviceURL}${loginPath}`,
    {
      data: loginDto,
    },
  )
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)

})

test('successful authorization flow with correct username and password return 200', async ({
                                                     request,
                                                   }) => {
  const loginDto =
    LoginDto.createLoginWithCorrectCredentials()

  const response = await request.post(
    `${serviceURL}${loginPath}`,
    {
      data: loginDto,
    },
  )
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.OK)
  console.log( await response.text())  //async

})