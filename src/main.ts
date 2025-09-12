import Address from './entities/address';
import Customer from './entities/customer';
import Order from './entities/order';
import { OrderItem } from './entities/orderItem';
import Product from './entities/product';

// Customer aggregate
const customer = new Customer('1', 'John', 'j@j.com', '123');
const address = new Address('Rua 1', 1, '123', 'São Paulo', 'SP');

customer.changeAddress(address);
customer.activate();

// Order aggregate
const product1 = new Product('1', 'product 1', 100);
const product2 = new Product('2', 'product 2', 200);

const orderItem1 = new OrderItem('1', product1.getId(), product1.getName(), product1.getPrice(), 1);
const orderItem2 = new OrderItem('2', product2.getId(), product2.getName(), product2.getPrice(), 2);

const order = new Order('1', customer.getId(), [orderItem1, orderItem2]);

console.log(order.getTotal());
