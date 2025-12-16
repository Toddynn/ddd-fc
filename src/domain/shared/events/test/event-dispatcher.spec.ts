import { EventDispatcher } from '../event-dispatcher';
import { TestEvent } from './test-event';
import { TestEventHandler } from './test-event-handler';

describe('EventDispatcher unit tests', () => {
	it('should be able to register an event handler', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new TestEventHandler();

		eventDispatcher.register('EventCreated', eventHandler);

		expect(eventDispatcher.getEventHandlers('EventCreated')).toBeDefined();
		expect(eventDispatcher.getEventHandlers('EventCreated').length).toBe(1);
		expect(eventDispatcher.getEventHandlers('EventCreated')[0]).toBe(eventHandler);
	});

	it('should be able to unregister an event handler', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new TestEventHandler();

		eventDispatcher.unregister('EventCreated', eventHandler);

		expect(eventDispatcher.getEventHandlers('EventCreated')).toBeDefined();
		expect(eventDispatcher.getEventHandlers('EventCreated').length).toBe(0);
	});

	it('should be able to unregister all event handlers', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new TestEventHandler();

		eventDispatcher.register('EventCreated', eventHandler);

		eventDispatcher.unregisterAll();
	});

	it('should be able to notify an event', () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new TestEventHandler();
		const spyEventHandler = jest.spyOn(eventHandler, 'handle');

		eventDispatcher.register('TestEvent', eventHandler);

		eventDispatcher.notify(new TestEvent());

		expect(spyEventHandler).toHaveBeenCalled();
	});
});
