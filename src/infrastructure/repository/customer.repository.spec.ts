import { Sequelize } from 'sequelize-typescript';
import Customer from '../../domain/entities/customer';
import CustomerModel from '../database/sequelize/models/customer.model';
import CustomerRepository from './customer.repository';

describe('CustomerRepository unit tests', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([CustomerModel]);

		await sequelize.sync();
	});

	afterEach(async () => {
		if (sequelize) await sequelize.close();
	});

	it('should create a customer', async () => {
		const customerRepository = new CustomerRepository();

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
