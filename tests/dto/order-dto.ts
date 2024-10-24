export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  private constructor(
    // private -> access to this constructor only from class name. "new" with private not used
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  // add a method to create a new instance with random data
  static createOrderWithCorrectRandomData(): OrderDto {
    return new OrderDto(
      'OPEN',
      Math.floor(Math.random() * 100),
      'John Doe',
      '+123456789',
      'Urgent order',
      Math.floor(Math.random() * 100),
    )
  }

  // add a method to create a new instance with random data
  static createOrderWithIncorrectRandomData(): OrderDto {
    return new OrderDto(
      'CLOSED',
      Math.floor(Math.random() * 100),
      'John Doe',
      '+123456789',
      'Urgent order',
      Math.floor(Math.random() * 100),
    )
  }
}
