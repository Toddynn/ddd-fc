import { Product } from '../../product/entities/product';
import { ShowConsoleLogWhenProductIsCreatedHandler } from './handlers/show-console-log-when-product-is-created.handler';
import { ProductCreatedEvent } from './product-created.event';

describe('ProductCreatedEvent unit tests', () => {
	it('should create a ProductCreatedEvent with correct data', () => {
		const product = new Product('1', 'Product Name', 99.99);
		const event = new ProductCreatedEvent(product);

		expect(event.eventData.product).toBe(product);
		expect(event.eventData.product.id).toBe(product.id);
		expect(event.eventData.product.name).toBe(product.name);
		expect(event.eventData.product.price).toBe(product.price);
		expect(event.occurredTimestamp).toBeInstanceOf(Date);
	});

	it('should set occurredTimestamp when event is created', () => {
		const product = new Product('1', 'Product Name', 99.99);
		const beforeCreation = new Date();
		const event = new ProductCreatedEvent(product);
		const afterCreation = new Date();

		expect(event.occurredTimestamp.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
		expect(event.occurredTimestamp.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
	});

	it('should handle event with ShowConsoleLogWhenProductIsCreatedHandler', () => {
		const product = new Product('1', 'Product Name', 99.99);
		const event = new ProductCreatedEvent(product);
		const handler = new ShowConsoleLogWhenProductIsCreatedHandler();
		const spyEventHandler = jest.spyOn(handler, 'handle');

		handler.handle(event);

		expect(spyEventHandler).toHaveBeenCalledWith(event);
	});
});
