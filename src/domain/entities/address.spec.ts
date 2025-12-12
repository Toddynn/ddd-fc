import { Address } from './address';

describe('Address unit tests', () => {
	it('should throw error when street is empty', () => {
		expect(() => {
			const address = new Address('', 1, '123', 'São Paulo', 'SP');
		}).toThrow('Street is required');
	});

	it('should throw error when number is empty', () => {
		expect(() => {
			const address = new Address('Rua 1', 0, '123', 'São Paulo', 'SP');
		}).toThrow('Number is required');
	});

	it('should throw error when zip is empty', () => {
		expect(() => {
			const address = new Address('Rua 1', 1, '', 'São Paulo', 'SP');
		}).toThrow('Zip is required');
	});

	it('should throw error when city is empty', () => {
		expect(() => {
			const address = new Address('Rua 1', 1, '123', '', 'SP');
		}).toThrow('City is required');
	});

	it('should throw error when state is empty', () => {
		expect(() => {
			const address = new Address('Rua 1', 1, '123', 'São Paulo', '');
		}).toThrow('State is required');
	});
});
