import { randomUUID } from 'node:crypto';
import { Product } from '../entities/product';
import { ProductB } from '../entities/product-b';
import type { ProductInterface } from '../interfaces/product.interface';
import { InvalidProductTypeError } from '../shared/utils/errors/invalid-product-type.error';

export class ProductFactory {
	create(type: 'a' | 'b', name: string, price: number): ProductInterface {
		const id = randomUUID();
		switch (type) {
			case 'a':
				return new Product(id, name, price);
			case 'b':
				return new ProductB(id, name, price);
			default:
				throw new InvalidProductTypeError();
		}
	}
}
