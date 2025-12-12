import type { Product } from '../entities/product';

export class ProductsService {
	static increasePrice(products: Array<Product>, percentage: number): void {
		for (const product of products) {
			const oldPrice = product.price;
			product.changePrice(oldPrice + (oldPrice * percentage) / 100);
		}
	}
}
