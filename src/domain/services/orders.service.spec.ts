import Customer from '../entities/customer';
import Order from '../entities/order';
import OrderItem from '../entities/orderItem';
import OrdersService from './orders.service';

describe('OrderService unit tests', () => {
	it('should get total of all orders', () => {
		const item1 = new OrderItem('1', '1', 'Item 1', 100, 2);
		const item2 = new OrderItem('2', '2', 'Item 2', 200, 2);

		const order1 = new Order('1', '1', [item1]);
		const order2 = new Order('2', '1', [item2]);

		const total = OrdersService.getTotal([order1, order2]);
		expect(total).toBe(600);
	});

	it('should place and order', () => {
		const customer = new Customer('1', 'John', 'j@j.com', '123');

		const orderItem1 = new OrderItem('1', '1', 'Item 1', 10, 2);

		const order = OrdersService.placeOrder(customer, [orderItem1]);

		expect(customer.getRewardPoints()).toBe(10);
		expect(order.getTotal()).toBe(20);
	});
});
