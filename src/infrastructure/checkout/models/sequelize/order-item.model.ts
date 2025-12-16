import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ProductModel } from '../../../product/models/sequelize/product.model';
import type { OrderModel } from './order.model';

const getOrderModel = () => require('./order.model').OrderModel;

@Table({
	tableName: 'orders_items',
	timestamps: false,
})
export class OrderItemModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	declare quantity: number;

	@Column({ allowNull: false })
	declare name: string;

	@Column({ allowNull: false })
	declare price: number;

	@ForeignKey(() => getOrderModel())
	@Column({ allowNull: false })
	declare order_id: string;

	@BelongsTo(() => getOrderModel())
	declare order: OrderModel;

	@ForeignKey(() => ProductModel)
	@Column({ allowNull: false })
	declare product_id: string;

	@BelongsTo(() => ProductModel)
	declare product: ProductModel;
}
