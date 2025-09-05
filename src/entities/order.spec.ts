import Order from './order';
import { OrderItem } from './orderItem';
import Product from './product';

const product1 = new Product('1', 'Product 1', 100);
const product2 = new Product('2', 'Product 2', 200);

describe('Order unit tests', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			const order = new Order('', '123', []);
		}).toThrow('Id is required');
	});

	it('should throw error when customerId is empty', () => {
		expect(() => {
			const order = new Order('1', '', []);
		}).toThrow('CustomerId is required');
	});

	it('should throw error when products is empty', () => {
		expect(() => {
			const order = new Order('1', '123', []);
		}).toThrow('OrderItems are required');
	});

	it('should throw error when quantity is less than 1', () => {
		expect(() => {
			const item = new OrderItem('1', '1', product1.getId(), 100, 0);
			const order = new Order('1', '1123', [item]);
		}).toThrow('Quantity must be greater or equal to 1');
	});

	it('should calculate total', () => {
		const item1 = new OrderItem('1', product1.getId(), 'Item 1', 100, 2);
		const item2 = new OrderItem('2', product2.getId(), 'Item 1', 200, 2);
		const order1 = new Order('1', '123', [item1]);

		let total = order1.getTotal();
		expect(total).toBe(200);

		const order2 = new Order('1', '123', [item1, item2]);
		total = order2.getTotal();
		expect(total).toBe(600);
	});
});
