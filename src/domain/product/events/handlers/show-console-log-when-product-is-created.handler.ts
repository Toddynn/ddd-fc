import type { EventHandlerInterface } from '../../../shared/events/interfaces/event-handler.interface';
import type { ProductCreatedEvent } from '../product-created.event';

export class ShowConsoleLogWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
	handle(event: ProductCreatedEvent): void {
		const { product } = event.eventData;
		console.log(`This Product was created: id: ${product.id}, name: ${product.name}, price: ${product.price}`);
	}
}
