import Order from './order';
import Product from './product';

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
		}).toThrow('Products are required');
	});

	it('should calculate total', () => {
		const item1 = new Product('1', 'Item 1', 100);
		const item2 = new Product('2', 'Item 2', 200);
		const order = new Order('1', '123', [item1, item2]);
		const total = order.total();
		expect(total).toBe(300);
	});
});
