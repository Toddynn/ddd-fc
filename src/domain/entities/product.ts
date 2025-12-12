import { DomainError } from '../../utils/errors/domain-error';

export class Product {
	private _id: string;
	private _name: string;
	private _price: number;

	constructor(id: string, name: string, price: number) {
		Product.validateId(id);
		Product.validateName(name);
		Product.validatePrice(price);

		this._id = id;
		this._name = name;
		this._price = price;
	}

	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get price() {
		return this._price;
	}

	changePrice(price: number) {
		Product.validatePrice(price);
		this._price = price;
	}

	changeName(name: string) {
		Product.validateName(name);
		this._name = name;
	}

	private static validateId(id: string) {
		if (!id) throw new DomainError('Id is required');
	}
	private static validateName(name: string) {
		if (!name) throw new DomainError('Name is required');
	}
	private static validatePrice(price: number) {
		if (price < 0) throw new DomainError('Price must be greater or equal to 0');
	}
}
