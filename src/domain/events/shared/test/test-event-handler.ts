import type { EventInterface } from '../interfaces/event.interface';
import type { EventHandlerInterface } from '../interfaces/event-handler.interface';

export class TestEventHandler implements EventHandlerInterface<EventInterface> {
	handle(event: EventInterface): void {
		console.log(`Event ${event.constructor.name} occurred at ${event.occurredTimestamp}`);
	}
}
