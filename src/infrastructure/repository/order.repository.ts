import { Order } from '../../domain/entities/order';
import { OrderItem } from '../../domain/entities/orderItem';
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
		const orderModels = await OrderModel.findAll({
			include: [{ model: OrderItemModel }],
		});

		return orderModels.map((orderModel) => {
			const orderItems = orderModel.items.map((item) => new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity));
			return new Order(orderModel.id, orderModel.customer_id, orderItems);
		});
	}

	async find(id: string): Promise<Order | null> {
		const orderModel = await OrderModel.findOne({
			where: { id },
			include: [{ model: OrderItemModel }],
		});

		if (!orderModel) {
			return null;
		}

		const orderItems = orderModel.items.map((item) => new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity));

		return new Order(orderModel.id, orderModel.customer_id, orderItems);
	}

	async update(entity: Order): Promise<void> {
		await OrderModel.update(
			{
				customer_id: entity.customerId,
				total: entity.getTotal(),
			},
			{ where: { id: entity.id } },
		);

		await OrderItemModel.destroy({ where: { order_id: entity.id } });

		await OrderItemModel.bulkCreate(
			entity.items.map((item) => ({
				id: item.id,
				product_id: item.productId,
				order_id: entity.id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
		);
	}

	async delete(id: string): Promise<void> {
		await OrderItemModel.destroy({ where: { order_id: id } });
		await OrderModel.destroy({ where: { id } });
	}
}
