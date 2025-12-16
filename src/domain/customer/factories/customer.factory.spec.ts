import { Address } from '../value-objects/address';
import { CustomerFactory } from './customer.factory';

describe('CustomerFactory unit tests', () => {
	const customerFactory = new CustomerFactory();
	it('should create a customer without address', () => {
		const customer = customerFactory.create('Customer A', 'j@j.com', '123');

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('Customer A');
		expect(customer.email).toBe('j@j.com');
		expect(customer.phone).toBe('123');
		expect(customer.address).toBeUndefined();
		expect(customer.constructor.name).toBe('Customer');
	});

	it('should create a customer with address', () => {
		const address = new Address('Rua 1', 1, '123', 'São Paulo', 'SP');
		const customer = customerFactory.createWithAddress('Customer A', 'j@j.com', '123', address);

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('Customer A');
		expect(customer.email).toBe('j@j.com');
		expect(customer.phone).toBe('123');
		expect(customer.address).toBeDefined();
		expect(customer.address.street).toBe('Rua 1');
		expect(customer.address.number).toBe(1);
		expect(customer.address.zip).toBe('123');
		expect(customer.address.city).toBe('São Paulo');
		expect(customer.address.state).toBe('SP');
		expect(customer.constructor.name).toBe('Customer');
		expect(customer.address.constructor.name).toBe('Address');
	});
});
