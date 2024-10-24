export class LoginDto {
  username: string
  password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createLoginWithCorrectCredentials(): LoginDto {
    return new LoginDto(process.env.USER || '', process.env.PASSWORD || '')
  }
  static createLoginWithIncorrectCredentials(): LoginDto {
    return new LoginDto('marusia', 'password')
  }
}
