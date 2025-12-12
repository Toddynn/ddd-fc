import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

const getOrderModel = () => require('./order.model').OrderModel;

@Table({
	tableName: 'customers',
	timestamps: false,
})
export class CustomerModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	declare name: string;

	@Column({ allowNull: false })
	declare email: string;

	@Column({ allowNull: false })
	declare phone: string;

	@Column({ allowNull: false })
	declare rewardPoints: number;

	@Column({ allowNull: false })
	declare active: boolean;

	@Column({ allowNull: true })
	declare street: string;

	@Column({ allowNull: true })
	declare number: number;

	@Column({ allowNull: true })
	declare zip: string;

	@Column({ allowNull: true })
	declare city: string;

	@Column({ allowNull: true })
	declare state: string;

	@HasMany(() => getOrderModel())
	declare orders: Array<ReturnType<typeof getOrderModel>>;
}
