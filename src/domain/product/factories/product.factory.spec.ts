import { InvalidProductTypeError } from '../shared/utils/errors/invalid-product-type.error';
import { ProductFactory } from './product.factory';

describe('ProductFactory unit tests', () => {
	const productFactory = new ProductFactory();
	it('should create a product type A', () => {
		const product = productFactory.create('a', 'Product A', 100);

		expect(product.id).toBeDefined();
		expect(product.name).toBe('Product A');
		expect(product.price).toBe(100);
		expect(product.constructor.name).toBe('Product');
	});

	it('should create a product type B', () => {
		const product = productFactory.create('b', 'Product B', 100);

		expect(product.id).toBeDefined();
		expect(product.name).toBe('Product B');
		expect(product.price).toBe(200);
		expect(product.constructor.name).toBe('ProductB');
	});

	it('should throw an error if the product type is invalid', () => {
		expect(() => productFactory.create('c' as 'a' | 'b', 'Product C', 100)).toThrow(InvalidProductTypeError);
	});
});
