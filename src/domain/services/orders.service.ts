import type { Customer } from '../entities/customer';
import { Order } from '../entities/order';
import type { OrderItem } from '../entities/orderItem';

export class OrdersService {
	static getTotal(orders: Order[]): number {
		return orders.reduce((total, order) => total + order.getTotal(), 0);
	}

	static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
		const order = new Order('1', customer.id, orderItems);
		customer.addRewardPoints(order.getTotal() / 2);
		return order;
	}
}
