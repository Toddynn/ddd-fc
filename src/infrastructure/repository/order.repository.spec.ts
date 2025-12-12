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
	let customerRepository: CustomerRepository;
	let productRepository: ProductRepository;
	let orderRepository: OrderRepository;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);

		await sequelize.sync();

		customerRepository = new CustomerRepository();
		productRepository = new ProductRepository();
		orderRepository = new OrderRepository();
	});

	afterEach(async () => {
		if (sequelize) await sequelize.close();
	});

	it('should create a order', async () => {
		const customer = new Customer('1', 'Customer 1', 'customer@gmail.com', '123123123');
		const address = new Address('Street 1', 1, '1234567890', 'City 1', 'State 1');
		customer.changeAddress(address);

		const product = new Product('1', 'Product 1', 100);
		const orderItem = new OrderItem('1', product.id, product.name, product.price, 2);
		const order = new Order('1', customer.id, [orderItem]);

		await Promise.all([customerRepository.create(customer), productRepository.create(product), orderRepository.create(order)]);

		const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] });

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

	it('should find all orders', async () => {
		const customer = new Customer('1', 'Customer 1', 'customer@gmail.com', '123123123');
		const product1 = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);

		const orderItem1 = new OrderItem('1', product1.id, product1.name, product1.price, 2);
		const order1 = new Order('1', customer.id, [orderItem1]);

		const orderItem2 = new OrderItem('2', product2.id, product2.name, product2.price, 3);
		const order2 = new Order('2', customer.id, [orderItem2]);

		await Promise.all([
			customerRepository.create(customer),
			productRepository.create(product1),
			productRepository.create(product2),
			orderRepository.create(order1),
			orderRepository.create(order2),
		]);

		const foundOrders = await orderRepository.findAll();

		expect(foundOrders).toHaveLength(2);
		expect(
			foundOrders.map((order) => ({
				id: order.id,
				customerId: order.customerId,
				total: order.getTotal(),
				items: order.items.map((item) => ({
					id: item.id,
					productId: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
			})),
		).toStrictEqual([
			{
				id: order1.id,
				customerId: order1.customerId,
				total: order1.getTotal(),
				items: order1.items.map((item) => ({
					id: item.id,
					productId: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
			},
			{
				id: order2.id,
				customerId: order2.customerId,
				total: order2.getTotal(),
				items: order2.items.map((item) => ({
					id: item.id,
					productId: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
			},
		]);
	});

	it('should find a order by id', async () => {
		const customer = new Customer('1', 'Customer 1', 'customer@gmail.com', '123123123');
		const product = new Product('1', 'Product 1', 100);
		const orderItem = new OrderItem('1', product.id, product.name, product.price, 2);
		const order = new Order('1', customer.id, [orderItem]);

		await Promise.all([customerRepository.create(customer), productRepository.create(product), orderRepository.create(order)]);

		const foundOrder = await orderRepository.find('1');

		expect(foundOrder).not.toBeNull();
		expect({
			id: foundOrder.id,
			customerId: foundOrder.customerId,
			total: foundOrder.getTotal(),
			items: foundOrder.items.map((item) => ({
				id: item.id,
				productId: item.productId,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
		}).toStrictEqual({
			id: order.id,
			customerId: order.customerId,
			total: order.getTotal(),
			items: order.items.map((item) => ({
				id: item.id,
				productId: item.productId,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
		});
	});

	it('should return null when order not found', async () => {
		const foundOrder = await orderRepository.find('non-existent-id');

		expect(foundOrder).toBeNull();
	});

	it('should update a order with items', async () => {
		const customer = new Customer('1', 'Customer 1', 'customer@gmail.com', '123123123');
		const product1 = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);

		const orderItem1 = new OrderItem('1', product1.id, product1.name, product1.price, 2);
		const order = new Order('1', customer.id, [orderItem1]);

		await Promise.all([
			customerRepository.create(customer),
			productRepository.create(product1),
			productRepository.create(product2),
			orderRepository.create(order),
		]);

		const orderItem2 = new OrderItem('2', product2.id, product2.name, product2.price, 3);
		const updatedOrder = new Order('1', customer.id, [orderItem2]);

		await orderRepository.update(updatedOrder);

		const orderModel = await OrderModel.findOne({ where: { id: '1' }, include: ['items'] });

		expect(orderModel.toJSON()).toStrictEqual({
			id: updatedOrder.id,
			customer_id: updatedOrder.customerId,
			total: updatedOrder.getTotal(),
			items: updatedOrder.items.map((item) => ({
				id: item.id,
				product_id: item.productId,
				order_id: updatedOrder.id,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),
		});
	});

	it('should delete a order and its items', async () => {
		const customer = new Customer('1', 'Customer 1', 'customer@gmail.com', '123123123');
		const product = new Product('1', 'Product 1', 100);
		const orderItem = new OrderItem('1', product.id, product.name, product.price, 2);
		const order = new Order('1', customer.id, [orderItem]);

		await Promise.all([customerRepository.create(customer), productRepository.create(product), orderRepository.create(order)]);

		await orderRepository.delete('1');

		const orderModel = await OrderModel.findOne({ where: { id: '1' } });
		const orderItemModel = await OrderItemModel.findOne({ where: { order_id: '1' } });

		expect(orderModel).toBeNull();
		expect(orderItemModel).toBeNull();
	});
});
