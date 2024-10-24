export class LoanApplication {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }
  // method to return Low risk with random data
  static generateApplicationWithLowRiskScoreBasedOnIncomeWithValidData(): LoanApplication {
    return new LoanApplication(
      Math.floor(Math.random() * 1000) + 4000,
      0,
      //Math.floor(Math.random() * 30) + 17,
      Math.floor(Math.random() * 20) + 20,
      true,
      Math.floor(Math.random() * 100) + 100,
      //[12, 18, 24, 30, 36][Math.floor(Math.random() * 5)],
      [12][Math.floor(Math.random())],
    )
  }
  // method to return Medium risk with random data
  static generateApplicationWithMediumRiskScoreBasedOnIncomeWithValidData(): LoanApplication {
    return new LoanApplication(
      Math.floor(Math.random() * 1001) + 1000,
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 50) + 17,
      true,
      Math.floor(Math.random() * 1000),
      //[6, 9, 12][Math.floor(Math.random() * 3)],
      [9][Math.floor(Math.random())],
    )
  }
  // method to return High risk with random data
  static generateApplicationWithHighRiskScoreBasedOnIncomeWithValidData(): LoanApplication {
    return new LoanApplication(
      //Math.floor(Math.random() * 10000),
      Math.floor(Math.random() * 1000) + 1,
      Math.floor(Math.random() * 100) + 100,
      Math.floor(Math.random() * 50) + 17,
      false,
      Math.floor(Math.random() * 1000) + 100,
      //[3, 6][Math.floor(Math.random() * 2)],
      [3][Math.floor(Math.random())],
    )
  }
  // A negative scenario where incomes that do not meet the requirements are below 1.
  static generateApplicationWithInvalidIncomeData(): LoanApplication {
    return new LoanApplication(
      //Math.floor(Math.random() * 1000) + 20000,
      0,
      0,
      Math.floor(Math.random() * 30) + 17,
      true,
      Math.floor(Math.random() * 100),
      [12, 18, 24, 30, 36][Math.floor(Math.random() * 5)],
    )
  }
  // A negative scenario where a large loan with a huge debt, is not comparable to income
  static generateApplicationWithLoanDebtIncomparableToIncome(): LoanApplication {
    return new LoanApplication(
      Math.floor(Math.random() * 1000),
      10000,
      Math.floor(Math.random() * 50) + 17,
      true,
      Math.floor(Math.random() * 100) + 10000,
      [12, 18, 24, 30, 36][Math.floor(Math.random() * 5)],
    )
  }
  // A negative scenario where Debt with a negative value
  static generateApplicationWithNegativeDebtValue(): LoanApplication {
    return new LoanApplication(
      Math.floor(Math.random() * 1000),
      -1 * Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 50) + 17,
      true,
      Math.floor(Math.random() * 1000),
      [12, 18, 24, 30, 36][Math.floor(Math.random() * 5)],
    )
  }
}
