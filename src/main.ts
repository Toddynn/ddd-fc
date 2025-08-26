import Address from './entities/address';
import Customer from './entities/customer';
import Order from './entities/order';
import OrderItem from './entities/order_item';

// Customer aggregate
const customer = new Customer('1', 'John', 'j@j.com', '123');
const address = new Address('Rua 1', 1, '123', 'São Paulo', 'SP');

customer.changeAddress(address);
customer.activate();

// Order aggregate
const item1 = new OrderItem('1', 'Item 1', 100);
const item2 = new OrderItem('2', 'Item 2', 200);

const order = new Order('1', customer._id, [item1, item2]);
