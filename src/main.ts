import { Order } from './domain/checkout/entities/order';
import { OrderItem } from './domain/checkout/entities/orderItem';
import { OrdersService } from './domain/checkout/services/orders.service';
import { Customer } from './domain/customer/entities/customer';
import { Address } from './domain/customer/value-objects/address';
import { Product } from './domain/product/entities/product';

// Customer aggregate
const customer = new Customer('1', 'John', 'j@j.com', '123');
const address = new Address('Rua 1', 1, '123', 'São Paulo', 'SP');

customer.changeAddress(address);
customer.activate();

// Order aggregate
const product1 = new Product('1', 'product 1', 100);
const product2 = new Product('2', 'product 2', 200);

const orderItem1 = new OrderItem('1', product1.id, product1.name, product1.price, 1);
const orderItem2 = new OrderItem('2', product2.id, product2.name, product2.price, 2);

const order = new Order('1', customer.id, [orderItem1, orderItem2]);

const orderPlaced = new OrdersService().placeOrder(customer, order.items);

console.log(orderPlaced.getTotal());
