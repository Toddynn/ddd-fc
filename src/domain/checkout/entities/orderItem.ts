import { DomainError } from '../../shared/utils/errors/domain-error';
import type { OrderItemInterface } from '../interfaces/order-item.interface';

export class OrderItem implements OrderItemInterface {
	private _id: string;
	private _productId: string;
	private _price: number;
	private _name: string;
	private _quantity: number;

	constructor(id: string, productId: string, name: string, price: number, quantity: number) {
		OrderItem.validateId(id);
		OrderItem.validateProductId(productId);
		OrderItem.validatePrice(price);
		OrderItem.validateName(name);
		OrderItem.validateQuantity(quantity);

		this._id = id;
		this._productId = productId;
		this._price = price;
		this._name = name;
		this._quantity = quantity;
	}

	get id() {
		return this._id;
	}

	get productId() {
		return this._productId;
	}

	get name() {
		return this._name;
	}

	get price() {
		return this._price;
	}

	get quantity() {
		return this._quantity;
	}

	getPriceByQuantity(): number {
		return this._price * this._quantity;
	}

	changeQuantity(quantity: number) {
		OrderItem.validateQuantity(quantity);
		this._quantity = quantity;
	}

	private static validateId(id: string) {
		if (!id) throw new DomainError('Id is required');
	}

	private static validateName(name: string) {
		if (!name) throw new DomainError('Name is required');
	}

	private static validateProductId(productId: string) {
		if (!productId) throw new DomainError('ProductId is required');
	}

	private static validatePrice(price: number) {
		if (price < 0) throw new DomainError('Price must be greater or equal to 0');
	}

	private static validateQuantity(quantity: number) {
		if (quantity < 1) throw new DomainError('Quantity must be greater or equal to 1');
	}
}
