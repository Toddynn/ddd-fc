import type { Order } from '../../domain/entities/order';
import type { OrderRepositoryInterface } from '../../domain/repository/order.repository.interface';
import { OrderModel } from '../database/sequelize/models/order.model';
import { OrderItemModel } from '../database/sequelize/models/order-item.model';

export class OrderRepository implements OrderRepositoryInterface {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customer_id: entity.customerId,
				total: entity.getTotal(),
				items: entity.items.map((item) => ({
					id: item.id,
					product_id: item.productId,
					order_id: entity.id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
			},
			{ include: [{ model: OrderItemModel }] },
		);
	}

	async findAll(): Promise<Order[]> {
		throw new Error('Method not implemented.');
	}

	async find(id: string): Promise<Order> {
		throw new Error('Method not implemented.');
	}

	async update(entity: Order): Promise<void> {
		await OrderModel.update(
			{
				customer_id: entity.customerId,
				total: entity.getTotal(),
			},
			{ where: { id: entity.id } },
		);
	}

	async delete(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
