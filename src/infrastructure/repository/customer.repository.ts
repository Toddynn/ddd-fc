import type { Customer } from '../../domain/entities/customer';
import type { CustomerRepositoryInterface } from '../../domain/repository/customer.repository.interface';
import { CustomerModel } from '../database/sequelize/models/customer.model';

export class CustomerRepository implements CustomerRepositoryInterface {
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			phone: entity.phone,
			email: entity.email,
			street: entity.address?.street,
			number: entity.address?.number,
			zip: entity.address?.zip,
			city: entity.address?.city,
			state: entity.address?.state,
			rewardPoints: entity.rewardPoints,
			active: entity.active,
		});
	}

	async findAll(): Promise<Customer[]> {
		throw new Error('Method not implemented.');
	}

	async find(id: string): Promise<Customer> {
		throw new Error('Method not implemented.');
	}

	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				phone: entity.phone,
				email: entity.email,
				street: entity.address.street,
				number: entity.address.number,
				zip: entity.address.zip,
				city: entity.address.city,
				state: entity.address.state,
				rewardPoints: entity.rewardPoints,
				active: entity.active,
			},
			{ where: { id: entity.id } },
		);
	}

	async delete(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
