import { ICustomersService } from './icustomers.service';
import { CustomersService } from './customers.service';
import { IEmailService } from './iemail.service';
import { Customer } from './customer';
import { ICustomersAsyncService } from './icustomersasync.service';

describe('Customer Service Test Suite', () => {
  let customerService: ICustomersService;
  let customersAsyncService: ICustomersAsyncService;
  let fakeEmailService: IEmailService;

  beforeEach(() => {
    fakeEmailService = {
      sendEmail: (from: string, to: string, subject: string, body: string) => {
        return true;
      }
    };

    spyOn(fakeEmailService, 'sendEmail').and.callThrough();

    customerService = new CustomersService(fakeEmailService);
    customersAsyncService = new CustomersService(fakeEmailService);
  });

  xit('Should have been instantiated', () => {
    expect(customerService).toBeDefined();
    expect(customerService).toBeTruthy();
  });

  xit('Should getCustomers() return data', () => {
    const expectedNoOfCustomers = 6;
    const expectedFirstCustomerId = 1;
    const expectedFirstCustomerName = 'Northwind Traders';

    const actualCustomers = customerService.getCustomers();

    expect(actualCustomers.length).toBe(expectedNoOfCustomers);
    expect(actualCustomers[0].id).toBe(expectedFirstCustomerId);
    expect(actualCustomers[0].name).toBe(expectedFirstCustomerName);
  });

  xit('Should searchCustomers() return filtered data', () => {
    const filterString = 'rich';
    const expectedNoOfCustomers = 1;
    const expectedCustomerName = 'Oxyrich Traders';
    const expectedCustomerId = 5;

    const actualCustomers = customerService.searchCustomers(filterString);

    expect(actualCustomers.length).toBe(expectedNoOfCustomers);
    expect(actualCustomers[0].id).toBe(expectedCustomerId);
    expect(actualCustomers[0].name).toBe(expectedCustomerName);
  });

  xit('Should getCustomerById() reutrn filtered customer record', () => {
    const customerId = 1;
    const expectedCustomerName = 'Northwind Traders';
    const actualCustomer = customerService.getCustomerById(customerId);

    expect(actualCustomer).toBeTruthy();
    expect(actualCustomer.name).toBe(expectedCustomerName);
  });

  xit('Should getCustomerById() with invalid customer id throw an exception', () => {
    const customerId = 101;

    expect(() => {
      customerService.getCustomerById(customerId);
    }).toThrowError('Invalid Customer Id Specified!');
  });

  it('Should saveCustomerRecord() saves and returns result', () => {
    const fakeCustomerRecord = new Customer(10, 'Fake Customer', 'BLR', 23000, true, 'Simple Remarks');
    const expectedStatus = true;
    const actualStatus = customerService.saveCustomerRecord(fakeCustomerRecord);
    const from = 'admin@pwc.com';
    const to = 'customer@pwc.com';
    const subject = 'Save Record';
    const body = 'Simple Body';

    expect(actualStatus).toBe(expectedStatus);
    expect(fakeEmailService.sendEmail).toHaveBeenCalledTimes(1);
    expect(fakeEmailService.sendEmail).toHaveBeenCalledWith(from, to, subject, body);
  });

  it('Should getCustomersAsync() returns results', done => {
    const promise = customersAsyncService.getCustomersAsync();

    promise.then(
      result => {
        const expectedNoOfCustomers = 6;
        const firstCustomerName = 'Northwind Traders';
        const firstCustomerId = 1;
        const actualCustomerName = result[0].name;
        const actualCustomerId = result[0].id;
        const actualNoOfCustomers = result.length;

        expect(result).toBeTruthy();
        expect(actualCustomerName).toBe(firstCustomerName);
        expect(actualCustomerId).toBe(firstCustomerId);
        expect(actualNoOfCustomers).toBe(expectedNoOfCustomers);

        done();
      },
      error => {
        throw error;
      }
    );
  });

  it('Should getCustomerByIdAsync() returns filtered customer record', async () => {
    const customerId = 1;
    const expectedCustomerName = 'Northwind Traders';
    const actualCustomer = await customersAsyncService.getCustomerByIdAsync(customerId);

    expect(actualCustomer).toBeTruthy();
    expect(actualCustomer.name).toBe(expectedCustomerName);
  });

  afterEach(() => {
    customerService = null;
    customersAsyncService = null;
  });

  it('Should searchCustomersAsync() returns filtered customers in observable', done => {
    const searchString = 'wind';
    const expectedNoOfCustomers = 4;
    const observable = customersAsyncService.searchCustomersAsync(searchString);

    observable.subscribe(
      result => {
        const actualNoOfCustomers = result.length;
        const expectedFirstCustomerName = 'Northwind Traders';
        const actualFirstCustomerName = result[0].name;

        expect(actualNoOfCustomers).toBe(expectedNoOfCustomers);
        expect(actualFirstCustomerName).toBe(expectedFirstCustomerName);
      },
      error => {},
      () => {
        done();
      }
    );
  });
});
