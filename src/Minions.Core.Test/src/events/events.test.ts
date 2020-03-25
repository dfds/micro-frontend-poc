import IEvent from "minions-core/lib/events/IEvent";
import IPublisher from "minions-core/lib/events/IPublisher";
import ISubscriber from "minions-core/lib/events/ISubscriber";
import EventCallback from "minions-core/lib/events/EventCallback";

const expect: any = chai.expect;

suite("Minions.Core.Events", () => {
    test("module exports EventCallback type", () => {
        const callback: EventCallback = async (event: IEvent) => { return event !== undefined; };

        expect(callback).to.equal(callback);
    });

    test("module exports IEvent interface", () => {
        const event: IEvent = {id: "", version: "", payload: "", source: ""};

        expect(event).to.equal(event);
    });

    test("module exports IPublisher interface", () => {
        const publisher: IPublisher = {
            publish: async (event: IEvent) => { return event !== undefined; }
        };

        expect(publisher).to.equal(publisher);
    });

    test("module exports ISubscriber interface", () => {
        const subscriber: ISubscriber = { subscribe: (handler: EventCallback) => { return handler !== undefined; } };

        expect(subscriber).to.equal(subscriber);
    });
});