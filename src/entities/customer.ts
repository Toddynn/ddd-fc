import type Address from './address';

//* Uma entidade deve, a todo momento, permanecer consistente, e validar-se
export default class Customer {
	_id: string;
	_name: string;
	_email: string = '';
	_phone: string = '';
	_address!: Address;
	_active: boolean = false;

	constructor(id: string, name: string, email: string, phone: string) {
		this._id = id;
		this._name = name;
		this._email = email;
		this._phone = phone;
		this.validateConstructor();
	}

	validateConstructor() {
		if (!this._id) {
			throw new Error('Id is required');
		}
		if (this._name.length < 3) {
			throw new Error('Name must have at least 3 characters');
		}
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
}
