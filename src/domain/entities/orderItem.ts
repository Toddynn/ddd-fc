export default class OrderItem {
	private _id: string;
	private _productId: string;
	private _name: string;
	private _price: number;
	private _quantity: number;

	constructor(id: string, productId: string, name: string, price: number, quantity: number) {
		OrderItem.validateId(id);
		OrderItem.validateProductId(productId);
		OrderItem.validateName(name);
		OrderItem.validatePrice(price);
		OrderItem.validateQuantity(quantity);

		this._id = id;
		this._productId = productId;
		this._name = name;
		this._price = price;
		this._quantity = quantity;
	}

	getQuantity(): number {
		return this._quantity;
	}

	getPriceByQuantity(): number {
		return this._price * this._quantity;
	}

	getPrice(): number {
		return this._price;
	}

	changeQuantity(quantity: number) {
		OrderItem.validateQuantity(quantity);
		this._quantity = quantity;
	}

	private static validateId(id: string) {
		if (!id) throw new Error('Id is required');
	}

	private static validateProductId(productId: string) {
		if (!productId) throw new Error('ProductId is required');
	}

	private static validateName(name: string) {
		if (!name) throw new Error('Name is required');
	}

	private static validatePrice(price: number) {
		if (price < 0) throw new Error('Price must be greater or equal to 0');
	}

	private static validateQuantity(quantity: number) {
		if (quantity < 1) throw new Error('Quantity must be greater or equal to 1');
	}
}
