import type { Customer } from '../../customer/entities/customer';
import type { Order } from '../entities/order';
import type { OrderItem } from '../entities/orderItem';
import { OrderFactory } from '../factories/order.factory';

export class OrdersService {
	constructor(private orderFactory: OrderFactory = new OrderFactory()) {}

	getTotal(orders: Order[]): number {
		return orders.reduce((total, order) => total + order.getTotal(), 0);
	}

	placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
		const order = this.orderFactory.create(customer.id, orderItems);
		customer.addRewardPoints(order.getTotal() / 2);
		return order;
	}
}
