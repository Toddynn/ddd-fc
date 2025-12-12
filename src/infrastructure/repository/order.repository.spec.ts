import { Sequelize } from 'sequelize-typescript';
import { Address } from '../../domain/entities/address';
import { Customer } from '../../domain/entities/customer';
import { Order } from '../../domain/entities/order';
import { OrderItem } from '../../domain/entities/orderItem';
import { Product } from '../../domain/entities/product';
import { CustomerModel } from '../database/sequelize/models/customer.model';
import { OrderModel } from '../database/sequelize/models/order.model';
import { OrderItemModel } from '../database/sequelize/models/order-item.model';
import { ProductModel } from '../database/sequelize/models/product.model';
import { CustomerRepository } from './customer.repository';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';

describe('OrderRepository unit tests', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);

		await sequelize.sync();
	});

	afterEach(async () => {
		if (sequelize) await sequelize.close();
	});

	it('should create a order', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer('1', 'Customer 1', 'customer@gmail.com', '123123123');
		const address = new Address('Street 1', 1, '1234567890', 'City 1', 'State 1');
		customer.changeAddress(address);

		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 100);
		await productRepository.create(product);

		const orderItem = new OrderItem('1', product.id, product.name, product.price, 2);

		const order = new Order('1', customer.id, [orderItem]);

		const orderRepository = new OrderRepository();

		await orderRepository.create(order);
		const orderModel = await OrderModel.findOne({ where: { id: '1' }, include: ['items'] });

		expect(orderModel.toJSON()).toStrictEqual({
			id: order.id,
			customer_id: order.customerId,
			total: order.getTotal(),
			items: order.items.map((item) => ({
				id: item.id,
				product_id: item.productId,
				order_id: order.id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
		});
	});
});
