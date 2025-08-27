class DomainError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DomainError';
	}
}

export default class Product {
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

	getId() {
		return this._id;
	}
	getName() {
		return this._name;
	}
	getPrice() {
		return this._price;
	}

	changePrice(price: number) {
		if (price < 0) {
			throw new Error('Price must be greater or equal to 0');
		}
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
