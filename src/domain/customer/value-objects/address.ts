import { DomainError } from '../../shared/utils/errors/domain-error';
import type { AddressInterface } from '../interfaces/address.interface';

export class Address implements AddressInterface {
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

	get street() {
		return this._street;
	}

	get number() {
		return this._number;
	}

	get zip() {
		return this._zip;
	}

	get city() {
		return this._city;
	}

	get state() {
		return this._state;
	}

	toString() {
		return `${this._street}, ${this._number}, ${this._zip}, ${this._city} - ${this._state}`;
	}

	private static validateStreet(street: string) {
		if (!street) throw new DomainError('Street is required');
	}

	private static validateNumber(number: number) {
		if (!number) throw new DomainError('Number is required');
	}

	private static validateZip(zip: string) {
		if (!zip) throw new DomainError('Zip is required');
	}

	private static validateCity(city: string) {
		if (!city) throw new DomainError('City is required');
	}

	private static validateState(state: string) {
		if (!state) throw new DomainError('State is required');
	}
}
