import { ICustomersService } from './icustomers.service';
import { Customer } from './customer';
import { IEmailService } from './iemail.service';
import { ICustomersAsyncService } from './icustomersasync.service';
import { Observable } from 'rxjs';

const MIN_SEARCH_INDEX = 0;
const MIN_RECORD_INDEX = 0;
const DEFAULT_TIMEOUT = 2000;

export class CustomersService implements ICustomersService, ICustomersAsyncService {
  private customers: Customer[] = [
    new Customer(1, 'Northwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
    new Customer(2, 'Eastwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
    new Customer(3, 'Southwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
    new Customer(4, 'Westwind Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
    new Customer(5, 'Oxyrich Traders', 'Bangalore', 23000, true, 'Simple Custome Record'),
    new Customer(6, 'Adventureworks', 'Bangalore', 23000, true, 'Simple Custome Record')
  ];

  constructor(private emailService: IEmailService) {}

  getCustomers(): Customer[] {
    return this.customers;
  }

  searchCustomers(searchString: string): Customer[] {
    const filteredCustomers = this.customers.filter(
      customer => customer.name.indexOf(searchString) >= MIN_SEARCH_INDEX
    );

    return filteredCustomers;
  }

  getCustomerById(id: number): Customer {
    let filteredCustomer: Customer;

    for (const customer of this.customers) {
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

    const index = this.customers.push(customerRecord);
    const saveStatus = index >= MIN_RECORD_INDEX;
    const emailStatus = this.emailService.sendEmail('admin@pwc.com', 'customer@pwc.com', 'Save Record', 'Simple Body');

    return saveStatus && emailStatus;
  }

  getCustomersAsync(): Promise<Customer[]> {
    const promise = new Promise<Customer[]>((success, failure) => {
      setTimeout(() => {
        success(this.customers);
      }, DEFAULT_TIMEOUT);
    });

    return promise;
  }

  // getCustomerByIdAsync(id: number): Promise<Customer> {
  //   const promise = new Promise<Customer>((success, failure) => {
  //     try {
  //       const filteredCustomer = this.getCustomerById(id);

  //       success(filteredCustomer);
  //     } catch (error) {
  //       failure(error);
  //     }
  //   });

  //   return promise;
  // }

  async getCustomerByIdAsync(id: number): Promise<Customer> {
    let filteredCustomer: Customer;

    try {
      const allCustomers = await this.getCustomersAsync();

      for (const customer of allCustomers) {
        if (customer.id === id) {
          filteredCustomer = customer;
          break;
        }
      }
    } catch (error) {
      throw error;
    }

    return filteredCustomer;
  }

  searchCustomersAsync(searchString: string): Observable<Customer[]> {
    const observable = Observable.create((observer: any) => {
      const filteredCustomers = this.searchCustomers(searchString);

      observer.next(filteredCustomers);
      observer.complete();
    });

    return observable;
  }
}
