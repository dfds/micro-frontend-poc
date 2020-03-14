import IEvent from "minions-core/lib/events/IEvent";
import IPublisher from "minions-core/lib/events/IPublisher";
import ISubscriber from "minions-core/lib/events/ISubscriber";
import SubscriberCallback from "minions-core/lib/events/SubscriberCallback";
import KafkaEventBridgeOptions from "./KafkaEventBridgeOptions";

export default class KafkaEventBridge extends HTMLElement implements IPublisher, ISubscriber, EventListenerObject {
    private callbacks: Array<SubscriberCallback>;
    private webSocket: WebSocket;
    
    constructor(options: KafkaEventBridgeOptions) {
        super();

        this.webSocket = new WebSocket(options.signalREndpoint);
    }

    publish(event: IEvent): Promise<boolean> {
        //TODO: publish event to kafka topic or inproc recipient.
        return new Promise<boolean>((resolve) => {
            if (event !== undefined) {
                resolve(true);
            };

            resolve(false);
        });
    }

    subscribe(callback: SubscriberCallback): any {
        if (!this.callbacks) {
            this.callbacks = new Array<SubscriberCallback>();
        }

        this.callbacks.push(callback);
    }

    handleEvent(evt: Event): void {
        //TODO: Implement concept for intercepting DOM events and mapping them to IEvent before being published.
    }
}