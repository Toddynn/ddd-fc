import { Product } from './product';

describe('Product unit tests', () => {
	it('should throw error when id is empty', () => {
		expect(() => {
			const product = new Product('', 'Item 1', 100);
		}).toThrow('Id is required');
	});

	it('should throw error when name is empty', () => {
		expect(() => {
			const product = new Product('1', '', 100);
		}).toThrow('Name is required');
	});

	it('should throw error when price is less than 0', () => {
		expect(() => {
			const product = new Product('1', 'Item 1', -1);
		}).toThrow('Price must be greater or equal to 0');
	});

	it('should change name', () => {
		const product = new Product('1', 'Item 1', 100);
		product.changeName('Item 2');
		expect(product.name).toBe('Item 2');
	});

	it('should change price', () => {
		const product = new Product('1', 'Item 1', 100);
		product.changePrice(200);
		expect(product.price).toBe(200);
	});

	it('should throw error when price is less than 0', () => {
		expect(() => {
			const product = new Product('1', 'Item 1', -1);
		}).toThrow('Price must be greater or equal to 0');
	});
});
