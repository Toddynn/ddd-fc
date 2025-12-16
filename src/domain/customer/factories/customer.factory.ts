import { randomUUID } from 'node:crypto';
import { Customer } from '../entities/customer';
import type { AddressInterface } from '../interfaces/address.interface';
import type { CustomerInterface } from '../interfaces/customer.interface';
import { Address } from '../value-objects/address';

export class CustomerFactory {
	create(name: string, email: string, phone: string): CustomerInterface {
		const id = randomUUID();
		return new Customer(id, name, email, phone);
	}

	createWithAddress(name: string, email: string, phone: string, address: AddressInterface): CustomerInterface {
		const id = randomUUID();
		const customer = new Customer(id, name, email, phone);
		customer.changeAddress(new Address(address.street, address.number, address.zip, address.city, address.state));
		return customer;
	}
}
