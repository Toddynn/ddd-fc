import Address from './address';
import Customer from './customer';

describe('Customer unit tests', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			const customer = new Customer('', 'John', 'j@j.com', '123');
		}).toThrow('Id is required');
	});

	it('should throw error when name is empty', () => {
		expect(() => {
			const customer = new Customer('1', '', 'j@j.com', '123');
		}).toThrow('Name is required');
	});

	it('should throw error when name is less than 3 characters', () => {
		expect(() => {
			const customer = new Customer('1', 'ab', 'j@j.com', '123');
		}).toThrow('Name must have at least 3 characters');
	});

	it('should change name', () => {
		const customer = new Customer('1', 'John', 'j@j.com', '123');
		customer.changeName('Jane');
		expect(customer.name).toBe('Jane');
	});

	it('should activate customer', () => {
		const customer = new Customer('1', 'John', 'j@j.com', '123');
		const address = new Address('Rua 1', 1, '123', 'São Paulo', 'SP');
		customer.changeAddress(address);

		customer.activate();

		expect(customer.active).toBe(true);
	});

	it('should deactivate customer', () => {
		const customer = new Customer('1', 'John', 'j@j.com', '123');
		customer.deactivate();
		expect(customer.active).toBe(false);
	});

	it('should throw error when address is undefined when you activate a customer', () => {
		expect(() => {
			const customer = new Customer('1', 'John', 'j@j.com', '123');
			customer.activate();
		}).toThrow('Address is mandatory to activate a customer');
	});

	it('should add reward points', () => {
		const customer = new Customer('1', 'John', 'j@j.com', '123');
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(20);
	});
});
