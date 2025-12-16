import { Customer } from '../entities/customer';
import { Address } from '../value-objects/address';
import { CustomerAddressChangedEvent } from './customer-address-changed.event';
import { ShowConsoleLogWhenAddressIsChangedHandler } from './handlers/show-console-log-when-address-is-changed.handler';

describe('CustomerAddressChangedEvent unit tests', () => {
	it('should create a CustomerAddressChangedEvent with correct data', () => {
		const oldAddress = new Address('Rua Antiga', 100, '11111-111', 'Cidade Antiga', 'Estado Antigo');
		const newAddress = new Address('Rua Nova', 200, '22222-222', 'Cidade Nova', 'Estado Novo');
		const customer = new Customer('1', 'John Doe', 'john@example.com', '1234567890', oldAddress);
		const event = new CustomerAddressChangedEvent(customer, oldAddress, newAddress);

		expect(event.eventData.customer).toBe(customer);
		expect(event.eventData.oldAddress).toBe(oldAddress);
		expect(event.eventData.newAddress).toBe(newAddress);
		expect(event.occurredTimestamp).toBeInstanceOf(Date);
	});

	it('should set occurredTimestamp when event is created', () => {
		const oldAddress = new Address('Rua Antiga', 100, '11111-111', 'Cidade Antiga', 'Estado Antigo');
		const newAddress = new Address('Rua Nova', 200, '22222-222', 'Cidade Nova', 'Estado Novo');
		const customer = new Customer('1', 'John Doe', 'john@example.com', '1234567890', oldAddress);
		const beforeCreation = new Date();
		const event = new CustomerAddressChangedEvent(customer, oldAddress, newAddress);
		const afterCreation = new Date();

		expect(event.occurredTimestamp.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
		expect(event.occurredTimestamp.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
	});

	it('should handle event with ShowConsoleLogWhenAddressIsChangedHandler', () => {
		const oldAddress = new Address('Rua Antiga', 100, '11111-111', 'Cidade Antiga', 'Estado Antigo');
		const newAddress = new Address('Rua Nova', 200, '22222-222', 'Cidade Nova', 'Estado Novo');
		const customer = new Customer('1', 'John Doe', 'john@example.com', '1234567890', oldAddress);
		const event = new CustomerAddressChangedEvent(customer, oldAddress, newAddress);
		const handler = new ShowConsoleLogWhenAddressIsChangedHandler();
		const spyEventHandler = jest.spyOn(handler, 'handle');

		handler.handle(event);

		expect(spyEventHandler).toHaveBeenCalledWith(event);
	});
});
