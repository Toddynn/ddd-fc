import type { EventInterface } from '../../shared/events/interfaces/event.interface';
import type { Customer } from '../entities/customer';

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
