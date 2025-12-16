import { DomainError } from '../../shared/utils/errors/domain-error';
import type { CustomerInterface } from '../interfaces/customer.interface';
import type { Address } from '../value-objects/address';

//* Uma entidade deve, a todo momento, permanecer consistente, e validar-se
export class Customer implements CustomerInterface {
	private _id: string;
	private _name: string;
	private _email: string = '';
	private _phone: string = '';
	private _address!: Address;
	private _active: boolean = false;
	private _rewardPoints: number = 0;

	constructor(id: string, name: string, email: string, phone: string, address?: Address) {
		Customer.validateId(id);
		Customer.validateName(name);
		Customer.validateEmail(email);
		Customer.validatePhone(phone);

		this._id = id;
		this._name = name;
		this._email = email;
		this._phone = phone;
		this._address = address;
	}

	get name() {
		return this._name;
	}

	get id() {
		return this._id;
	}

	get email() {
		return this._email;
	}

	get phone() {
		return this._phone;
	}

	get rewardPoints() {
		return this._rewardPoints;
	}

	get address() {
		return this._address;
	}

	get active() {
		return this._active;
	}

	changeName(name: string) {
		this._name = name;
	}

	changeAddress(address: Address) {
		this._address = address;
	}

	activate() {
		if (!this._address) throw new DomainError('Address is mandatory to activate a customer');
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	addRewardPoints(points: number) {
		this._rewardPoints += points;
	}

	private static validateId(id: string) {
		if (!id) throw new DomainError('Id is required');
	}

	private static validateName(name: string) {
		if (!name) throw new DomainError('Name is required');
		if (name.length < 3) throw new DomainError('Name must have at least 3 characters');
	}

	private static validateEmail(email: string) {
		//* alguma validação de email real
		if (!email) throw new DomainError('Email should be valid email address');
	}

	private static validatePhone(phone: string) {
		//* alguma validação de telefone real
		if (!phone) throw new DomainError('Phone should be valid phone number');
	}
}
