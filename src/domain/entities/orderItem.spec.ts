import OrderItem from './orderItem';

describe('OrderItem unit tests', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			const orderItem = new OrderItem('', '1', 'Item 1', 100, 2);
		}).toThrow('Id is required');
	});

	it('should throw error when productId is empty', () => {
		expect(() => {
			const orderItem = new OrderItem('1', '', 'Item 1', 100, 2);
		}).toThrow('ProductId is required');
	});

	it('should throw error when name is empty', () => {
		expect(() => {
			const orderItem = new OrderItem('1', '1', '', 100, 2);
		}).toThrow('Name is required');
	});

	it('should throw error when price is less than 0', () => {
		expect(() => {
			const orderItem = new OrderItem('1', '1', 'Item 1', -1, 2);
		}).toThrow('Price must be greater or equal to 0');
	});

	it('should throw error when quantity is less than 1', () => {
		expect(() => {
			const orderItem = new OrderItem('1', '1', 'Item 1', 100, 0);
		}).toThrow('Quantity must be greater or equal to 1');
	});

	it('should change quantity', () => {
		const orderItem = new OrderItem('1', '1', 'Item 1', 100, 2);
		orderItem.changeQuantity(3);
		expect(orderItem.getQuantity()).toBe(3);
	});
});
