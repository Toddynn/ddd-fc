import OrderItem from './orderItem';

export default class Order {
	private _id: string;
	private _customerId: string;
	private _items: OrderItem[] = [];

	constructor(id: string, customerId: string, OrderItems: OrderItem[]) {
		Order.validateId(id);
		Order.validateCustomerId(customerId);
		Order.validateOrderItems(OrderItems);

		this._id = id;
		this._customerId = customerId;
		this._items = OrderItems;
	}

	validateConstructor() {
		if (!this._id) {
			throw new Error('Id is required');
		}
		if (!this._customerId) {
			throw new Error('CustomerId is required');
		}
		if (this._items.length === 0) {
			throw new Error('OrderItems are required');
		}
	}

	getTotal() {
		return this._items.reduce((total, item) => total + item.getPriceByQuantity(), 0);
	}

	private static validateId(id: string) {
		if (!id) throw new Error('Id is required');
	}

	private static validateCustomerId(customerId: string) {
		if (!customerId) throw new Error('CustomerId is required');
	}

	private static validateOrderItems(OrderItems: OrderItem[]) {
		if (OrderItems.length === 0) throw new Error('OrderItems are required');
		if (OrderItems.some((item) => item.getQuantity() < 1)) throw new Error('Quantity must be greater or equal to 1');
	}
}
