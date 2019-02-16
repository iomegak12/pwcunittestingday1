import { Customer } from './customer';

export interface ICustomersService {
  getCustomers(): Customer[];
  searchCustomers(searchString: string): Customer[];
  getCustomerById(id: number): Customer;
  saveCustomerRecord(customer: Customer): boolean;
}
