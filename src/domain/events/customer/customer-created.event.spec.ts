import { Address } from '../../entities/address';
import { Customer } from '../../entities/customer';
import { CustomerCreatedEvent } from './customer-created.event';
import { ShowConsoleLogWhenCustomerIsCreatedHandler } from './handlers/show-console-log-when-customer-is-created.handler';

describe('CustomerCreatedEvent unit tests', () => {
	it('should create a CustomerCreatedEvent with correct data', () => {
		const address = new Address('Rua Teste', 123, '12345-678', 'Cidade', 'Estado');
		const customer = new Customer('1', 'John Doe', 'john@example.com', '1234567890', address);
		const event = new CustomerCreatedEvent(customer);

		expect(event.eventData.customer).toBe(customer);
		expect(event.eventData.customer.id).toBe(customer.id);
		expect(event.eventData.customer.name).toBe(customer.name);
		expect(event.eventData.customer.email).toBe(customer.email);
		expect(event.eventData.customer.phone).toBe(customer.phone);
		expect(event.occurredTimestamp).toBeInstanceOf(Date);
	});

	it('should set occurredTimestamp when event is created', () => {
		const address = new Address('Rua Teste', 123, '12345-678', 'Cidade', 'Estado');
		const customer = new Customer('1', 'John Doe', 'john@example.com', '1234567890', address);
		const beforeCreation = new Date();
		const event = new CustomerCreatedEvent(customer);
		const afterCreation = new Date();

		expect(event.occurredTimestamp.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
		expect(event.occurredTimestamp.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
	});

	it('should handle event with ShowConsoleLogWhenCustomerIsCreatedHandler', () => {
		const address = new Address('Rua Teste', 123, '12345-678', 'Cidade', 'Estado');
		const customer = new Customer('1', 'John Doe', 'john@example.com', '1234567890', address);
		const event = new CustomerCreatedEvent(customer);
		const handler = new ShowConsoleLogWhenCustomerIsCreatedHandler();
		const spyEventHandler = jest.spyOn(handler, 'handle');

		handler.handle(event);

		expect(spyEventHandler).toHaveBeenCalledWith(event);
	});
});
