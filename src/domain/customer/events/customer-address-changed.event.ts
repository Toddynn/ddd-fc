import type { EventInterface } from '../../shared/events/interfaces/event.interface';
import type { Customer } from '../entities/customer';
import type { Address } from '../value-objects/address';

type CustomerAddressChangedEventData = {
	customer: Customer;
	oldAddress: Address;
	newAddress: Address;
};

export class CustomerAddressChangedEvent implements EventInterface {
	occurredTimestamp: Date;
	eventData: CustomerAddressChangedEventData;

	constructor(
		private readonly customer: Customer,
		private readonly oldAddress: Address,
		private readonly newAddress: Address,
	) {
		this.occurredTimestamp = new Date();
		this.eventData = {
			customer: this.customer,
			oldAddress: this.oldAddress,
			newAddress: this.newAddress,
		};
	}
}
