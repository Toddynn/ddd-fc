import type Address from './address';

//* Uma entidade deve, a todo momento, permanecer consistente, e validar-se
export default class Customer {
	private _id: string;
	private _name: string;
	private _email: string = '';
	private _phone: string = '';
	private _address!: Address;
	private _active: boolean = false;

	constructor(id: string, name: string, email: string, phone: string) {
		Customer.validateId(id);
		Customer.validateName(name);
		Customer.validateEmail(email);
		Customer.validatePhone(phone);

		this._id = id;
		this._name = name;
		this._email = email;
		this._phone = phone;
	}

	getName() {
		return this._name;
	}

	changeName(name: string) {
		this._name = name;
	}

	changeAddress(address: Address) {
		this._address = address;
	}

	activate() {
		if (!this._address) throw new Error('Address is mandatory to activate a customer');
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	isActive() {
		return this._active;
	}

	private static validateId(id: string) {
		if (!id) throw new Error('Id is required');
	}

	private static validateName(name: string) {
		if (!name) throw new Error('Name is required');
		if (name.length < 3) throw new Error('Name must have at least 3 characters');
	}

	private static validateEmail(email: string) {
		//* alguma validação de email real
		if (!email) throw new Error('Email should be valid email address');
	}

	private static validatePhone(phone: string) {
		//* alguma validação de telefone real
		if (!phone) throw new Error('Phone should be valid phone number');
	}
}
