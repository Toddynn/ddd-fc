import Product from '../entities/product';

export default class ProductsService {
	static increasePrice(products: Array<Product>, percentage: number): void {
		products.forEach((product) => {
			const oldPrice = product.getPrice();
			product.changePrice(oldPrice + (oldPrice * percentage) / 100);
		});
	}
}
