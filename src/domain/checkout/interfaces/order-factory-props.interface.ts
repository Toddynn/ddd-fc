import type { OrderItemInterface } from './order-item.interface';

export interface OrderFactoryPropsInterface {
	id: string;
	customerId: string;
	items: Array<OrderItemInterface>;
}
