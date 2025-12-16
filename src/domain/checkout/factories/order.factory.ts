import { randomUUID } from 'node:crypto';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/orderItem';
import type { OrderItemInterface } from '../interfaces/order-item.interface';

export class OrderFactory {
	create(customerId: string, items: Array<OrderItemInterface>): Order {
		const id = randomUUID();

		const orderItems = items.map((item) => new OrderItem(item.id, item.productId, item.name, item.price, item.quantity));

		return new Order(id, customerId, orderItems);
	}
}
