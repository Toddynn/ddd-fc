export class InvalidProductTypeError extends Error {
	constructor(message = 'Invalid product type') {
		super(message);
		this.name = 'InvalidProductTypeError';
	}
}
