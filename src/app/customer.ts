export class Customer {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public credit: number,
    public status: boolean,
    public remarks: string
  ) {}

  toString() {
    const formattedMessage = `${this.id}, ${this.name}, ${this.address}, ${this.credit}, ${this.status}, ${
      this.remarks
    }`;

    return formattedMessage;
  }
}
