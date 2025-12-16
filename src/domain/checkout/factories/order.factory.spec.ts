import { OrderFactory } from './order.factory';

describe('OrderFactory unit tests', () => {
	const orderFactory = new OrderFactory();

	it('should create a order', () => {
		const orderProps = {
			customerId: '1',
			items: [
				{
					id: '1',
					productId: '1',
					name: 'Product 1',
					price: 100,
					quantity: 1,
				},
			],
		};

		const order = orderFactory.create(orderProps.customerId, orderProps.items);
		expect(order.id).toBeDefined();
		expect(order.customerId).toBe(orderProps.customerId);
		expect(order.items.length).toBe(orderProps.items.length);

		expect(order.items[0].productId).toBe(orderProps.items[0].productId);
		expect(order.items[0].name).toBe(orderProps.items[0].name);
		expect(order.items[0].price).toBe(orderProps.items[0].price);
		expect(order.items[0].quantity).toBe(orderProps.items[0].quantity);

		expect(order.constructor.name).toBe('Order');
		expect(order.items[0].constructor.name).toBe('OrderItem');
	});
});
