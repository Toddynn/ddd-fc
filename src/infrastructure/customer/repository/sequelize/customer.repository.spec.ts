import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../../../../domain/customer/entities/customer';
import { OrderModel } from '../../../checkout/models/sequelize/order.model';
import { OrderItemModel } from '../../../checkout/models/sequelize/order-item.model';
import { ProductModel } from '../../../product/models/sequelize/product.model';
import { CustomerModel } from '../../models/sequelize/customer.model';
import { CustomerRepository } from './customer.repository';

describe('CustomerRepository unit tests', () => {
	let sequelize: Sequelize;
	let customerRepository: CustomerRepository;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);

		await sequelize.sync();

		customerRepository = new CustomerRepository();
	});

	afterEach(async () => {
		if (sequelize) await sequelize.close();
	});

	it('should create a customer', async () => {
		const customer = new Customer('1', 'Customer 1', 'customer@gmail.com', '123123123');
		await customerRepository.create(customer);

		const customerModel = await CustomerModel.findOne({ where: { id: '1' } });
		expect(customerModel.toJSON()).toStrictEqual({
			id: '1',
			name: 'Customer 1',
			email: 'customer@gmail.com',
			phone: '123123123',
			street: null,
			number: null,
			zip: null,
			city: null,
			state: null,
			rewardPoints: 0,
			active: false,
		});
	});
});
