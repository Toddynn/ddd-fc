//* só carrega dados, sem regra de negócio = entidade anemica
class Customer {
	_id: string;
	_name: string;
	_email: string;
	_phone: string;
	_address: string;

	constructor(id: string, name: string, email: string, phone: string, address: string) {
		this._id = id;
		this._name = name;
		this._email = email;
		this._phone = phone;
		this._address = address;
	}

	get id(): string {
		return this._id;
	}
	get name(): string {
		return this._name;
	}
	get email(): string {
		return this._email;
	}
	get phone(): string {
		return this._phone;
	}
	get address(): string {
		return this._address;
	}
}
