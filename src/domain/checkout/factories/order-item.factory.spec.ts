import { OrderItemFactory } from './order-item.factory';

describe('OrderItemFactory unit tests', () => {
	const orderItemFactory = new OrderItemFactory();
	it('should create a orderItem', () => {
		const orderItem = orderItemFactory.create('1', 'Product 1', 100, 1);

		expect(orderItem.id).toBeDefined();
		expect(orderItem.productId).toBe('1');
		expect(orderItem.name).toBe('Product 1');
		expect(orderItem.price).toBe(100);
		expect(orderItem.quantity).toBe(1);
		expect(orderItem.constructor.name).toBe('OrderItem');
	});
});
