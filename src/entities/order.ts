import type Product from './product';

export default class Order {
	private _id: string;
	private _customerId: string;
	private _products: Product[] = [];

	constructor(id: string, customerId: string, products: Product[]) {
		this._id = id;
		this._customerId = customerId;
		this._products = products;
		this.validateConstructor();
	}

	validateConstructor() {
		if (!this._id) {
			throw new Error('Id is required');
		}
		if (!this._customerId) {
			throw new Error('CustomerId is required');
		}
		if (this._products.length === 0) {
			throw new Error('Products are required');
		}
	}

	total() {
		return this._products.reduce((total, item) => total + item.getPrice(), 0);
	}
}
