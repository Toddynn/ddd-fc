import type { Product } from '../../entities/product';
import type { EventInterface } from '../shared/interfaces/event.interface';

type ProductCreatedEventData = {
	product: Product;
};
export class ProductCreatedEvent implements EventInterface {
	occurredTimestamp: Date;
	eventData: ProductCreatedEventData;

	constructor(private readonly product: Product) {
		this.occurredTimestamp = new Date();
		this.eventData = {
			product: this.product,
		};
	}
}
