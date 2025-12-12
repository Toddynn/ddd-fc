import type { EventInterface } from './interfaces/event.interface';
import type { EventDispatcherInterface } from './interfaces/event-dispatcher.interface';
import type { EventHandlerInterface } from './interfaces/event-handler.interface';

export class EventDispatcher implements EventDispatcherInterface {
	private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

	notify(event: EventInterface): void {
		const eventName = event.constructor.name;
		const eventHandlers = this.eventHandlers[eventName];
		if (eventHandlers) {
			for (const eventHandler of eventHandlers) {
				eventHandler.handle(event);
			}
		}
	}

	getEventHandlers(eventName: string): EventHandlerInterface[] {
		return this.eventHandlers[eventName] || [];
	}

	register(eventName: string, eventHandler: EventHandlerInterface): void {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}
		this.eventHandlers[eventName].push(eventHandler);
	}

	unregister(eventName: string, eventHandler: EventHandlerInterface): void {
		if (this.eventHandlers[eventName]) {
			const index = this.eventHandlers[eventName].indexOf(eventHandler);
			if (index !== -1) {
				this.eventHandlers[eventName].splice(index, 1);
			}
		}
	}

	unregisterAll(): void {
		this.eventHandlers = {};
	}
}
