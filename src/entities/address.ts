export default class Address {
	private _street: string;
	private _number: number;
	private _zip: string;
	private _city: string;
	private _state: string;

	constructor(street: string, number: number, zip: string, city: string, state: string) {
		Address.validateStreet(street);
		Address.validateNumber(number);
		Address.validateZip(zip);
		Address.validateCity(city);
		Address.validateState(state);

		this._street = street;
		this._number = number;
		this._zip = zip;
		this._city = city;
		this._state = state;
	}

	toString() {
		return `${this._street}, ${this._number}, ${this._zip}, ${this._city} - ${this._state}`;
	}

	private static validateStreet(street: string) {
		if (!street) throw new Error('Street is required');
	}

	private static validateNumber(number: number) {
		if (!number) throw new Error('Number is required');
	}

	private static validateZip(zip: string) {
		if (!zip) throw new Error('Zip is required');
	}

	private static validateCity(city: string) {
		if (!city) throw new Error('City is required');
	}

	private static validateState(state: string) {
		if (!state) throw new Error('State is required');
	}
}
