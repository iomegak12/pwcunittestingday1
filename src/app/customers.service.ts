import { ICustomersService } from './icustomers.service';
import { Customer } from './customer';
import { IEmailService } from './iemail.service';

const MIN_SEARCH_INDEX = 0;
const MIN_RECORD_INDEX = 0;

const customers: Customer[] = [
  new Customer(1, 'Northwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
  new Customer(2, 'Eastwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
  new Customer(3, 'Southwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
  new Customer(4, 'Westwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
  new Customer(5, 'Oxyrich Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
  new Customer(6, 'Adventureworks', 'Bangalore', 23000, true, 'Simple Custome Record')
];

export class CustomersService implements ICustomersService {
  constructor(private emailService: IEmailService) {}

  getCustomers(): Customer[] {
    return customers;
  }

  searchCustomers(searchString: string): Customer[] {
    const filteredCustomers = customers.filter(customer => customer.name.indexOf(searchString) >= MIN_SEARCH_INDEX);

    return filteredCustomers;
  }

  getCustomerById(id: number): Customer {
    let filteredCustomer: Customer;

    for (const customer of customers) {
      if (customer.id === id) {
        filteredCustomer = customer;
        break;
      }
    }

    if (filteredCustomer === null || filteredCustomer === undefined) {
      throw new Error('Invalid Customer Id Specified!');
    }

    return filteredCustomer;
  }

  saveCustomerRecord(customerRecord: Customer): boolean {
    const status = customerRecord !== null && customerRecord.id !== 0 && customerRecord.name !== null;

    if (!status) {
      throw new Error('Invalid Customer Record Specified!');
    }

    const index = customers.push(customerRecord);
    const saveStatus = index >= MIN_RECORD_INDEX;
    const emailStatus = this.emailService.sendEmail('admin@pwc.com', 'customer@pwc.com', 'Save Record', 'Simple Body');

    return saveStatus && emailStatus;
  }
}
