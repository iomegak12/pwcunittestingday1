import { Customer } from './customer';
import { Observable } from 'rxjs';

export interface ICustomersAsyncService {
  getCustomersAsync(): Promise<Customer[]>;
  searchCustomersAsync(searchString: string): Observable<Customer[]>;
  getCustomerByIdAsync(id: number): Promise<Customer>;
}
