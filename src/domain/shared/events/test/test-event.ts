import type { EventInterface } from '../interfaces/event.interface';

export class TestEvent implements EventInterface {
	occurredTimestamp: Date;
	eventData: Record<string, unknown>;

	constructor(eventData: Record<string, unknown> = {}) {
		this.occurredTimestamp = new Date();
		this.eventData = eventData;
	}
}
