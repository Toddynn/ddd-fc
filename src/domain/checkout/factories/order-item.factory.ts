import { randomUUID } from 'node:crypto';
import { OrderItem } from '../entities/orderItem';
import type { OrderItemInterface } from '../interfaces/order-item.interface';

export class OrderItemFactory {
	create(productId: string, name: string, price: number, quantity: number): OrderItemInterface {
		const id = randomUUID();
		return new OrderItem(id, productId, name, price, quantity);
	}
}
