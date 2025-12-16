import type { Address } from '../value-objects/address';

export interface CustomerInterface {
	get id(): string;
	get name(): string;
	get email(): string;
	get phone(): string;
	get address(): Address | undefined;
}
