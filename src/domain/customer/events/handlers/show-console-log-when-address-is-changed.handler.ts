import type { EventHandlerInterface } from '../../../shared/events/interfaces/event-handler.interface';
import type { CustomerAddressChangedEvent } from '../customer-address-changed.event';

export class ShowConsoleLogWhenAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
	handle(event: CustomerAddressChangedEvent): void {
		const { customer, oldAddress, newAddress } = event.eventData;
		console.log(`Customer ${customer.name} (id: ${customer.id}) address changed from ${oldAddress.toString()} to ${newAddress.toString()}`);
	}
}
