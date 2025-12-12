import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { CustomerModel } from './customer.model';

const getOrderItemModel = () => require('./order-item.model').OrderItemModel;

@Table({
	tableName: 'orders',
	timestamps: false,
})
export class OrderModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	declare total: number;

	@ForeignKey(() => CustomerModel)
	@Column({ allowNull: false })
	declare customer_id: string;

	@BelongsTo(() => CustomerModel)
	declare customer: CustomerModel;

	@HasMany(() => getOrderItemModel())
	declare items: Array<ReturnType<typeof getOrderItemModel>>;
}
