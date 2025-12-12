import type { EventHandlerInterface } from '../../shared/interfaces/event-handler.interface';
import type { CustomerCreatedEvent } from '../customer-created.event';

export class ShowConsoleLogWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
	handle(event: CustomerCreatedEvent): void {
		const { customer } = event.eventData;
		console.log(`This Customer was created: id: ${customer.id}, name: ${customer.name}, email: ${customer.email}, phone: ${customer.phone}`);
	}
}
