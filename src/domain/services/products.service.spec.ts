import { Product } from '../entities/product';
import { ProductsService } from './products.service';

describe('Products service unit tests', () => {
	it('should change the prices of all products', () => {
		const product1 = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);

		const products = [product1, product2];

		ProductsService.increasePrice(products, 100);

		expect(product1.price).toBe(200);
		expect(product2.price).toBe(400);
	});
});
