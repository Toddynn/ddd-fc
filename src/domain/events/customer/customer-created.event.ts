import type { Customer } from '../../entities/customer';
import type { EventInterface } from '../shared/interfaces/event.interface';

type CustomerCreatedEventData = {
	customer: Customer;
};
export class CustomerCreatedEvent implements EventInterface {
	occurredTimestamp: Date;
	eventData: CustomerCreatedEventData;

	constructor(private readonly customer: Customer) {
		this.occurredTimestamp = new Date();
		this.eventData = {
			customer: this.customer,
		};
	}
}
