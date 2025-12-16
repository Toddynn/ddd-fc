import { Customer } from '../../customer/entities/customer';
import { Product } from '../../product/entities/product';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/orderItem';
import { OrdersService } from './orders.service';

describe('OrderService unit tests', () => {
	const ordersService = new OrdersService();
	it('should get total of all orders', () => {
		const product1 = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);

		const item1 = new OrderItem('1', product1.id, product1.name, product1.price, 2);
		const item2 = new OrderItem('2', product2.id, product2.name, product2.price, 2);

		const order1 = new Order('1', '1', [item1]);
		const order2 = new Order('2', '2', [item2]);

		const total = ordersService.getTotal([order1, order2]);
		expect(total).toBe(600);
	});

	it('should place and order', () => {
		const customer = new Customer('1', 'John', 'j@j.com', '123');

		const product1 = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);

		const orderItem1 = new OrderItem('1', product1.id, product1.name, product1.price, 2);
		const orderItem2 = new OrderItem('2', product2.id, product2.name, product2.price, 2);

		const order = new Order('1', '1', [orderItem1, orderItem2]);

		const orderPlaced = ordersService.placeOrder(customer, order.items);

		expect(customer.rewardPoints).toBe(300);
		expect(orderPlaced.getTotal()).toBe(600);
	});
});
