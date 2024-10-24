import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanApplication } from './loan-application'

// 10 Homework
//10.1  Scenario to check Low Risk score
test('post request calculate Low risk score with valid data returns code 200', async ({
  request,
}) => {
  const loanApplication =
    LoanApplication.generateApplicationWithLowRiskScoreBasedOnIncomeWithValidData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: loanApplication,
    },
  )
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskPeriods).toBeDefined()
  expect.soft(responseBody.applicationId).toBeTruthy()
  expect.soft(responseBody.riskDecision).toBe('positive')
})
// 10.2 Scenario to check Medium Risk score
test('post request calculate Medium risk score with valid data returns code 200', async ({
  request,
}) => {
  const orderDtoHw =
    LoanApplication.generateApplicationWithMediumRiskScoreBasedOnIncomeWithValidData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: orderDtoHw,
    },
  )
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskPeriods).toBeDefined()
  expect.soft(responseBody.applicationId).toBeTruthy()
  expect.soft(responseBody.riskDecision).toBe('positive')
})

//10.3 Scenario to check High Risk score
test('post request calculate High risk score with valid data returns code 200', async ({
  request,
}) => {
  const orderDtoHw =
    LoanApplication.generateApplicationWithHighRiskScoreBasedOnIncomeWithValidData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: orderDtoHw,
    },
  )
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskPeriods).toBeDefined()
  expect.soft(responseBody.applicationId).toBeTruthy()
  expect.soft(responseBody.riskDecision).toBe('positive')
})

// 10.4 A negative scenario where incomes that do not meet the requirements are below 1.
test('post request with invalid income data returns code 400', async ({ request }) => {
  const orderDtoHw = LoanApplication.generateApplicationWithInvalidIncomeData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: orderDtoHw,
    },
  )
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
// 10.5 A negative scenario where a large loan with a huge debt, is not comparable to income
test('post request with invalid age returns code 400', async ({ request }) => {
  const orderDtoHw = LoanApplication.generateApplicationWithLoanDebtIncomparableToIncome()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: orderDtoHw,
    },
  )
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)

  const responseBody = await response.json()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskDecision).toBe('negative')
})
// 10.6 A negative scenario where Debt with a negative value
test('post request with invalid debt returns code 400', async ({ request }) => {
  const orderDtoHw = LoanApplication.generateApplicationWithNegativeDebtValue()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: orderDtoHw,
    },
  )
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
