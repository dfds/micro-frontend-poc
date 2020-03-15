import IEvent from "minions-core/lib/events/IEvent";
import IPublisher from "minions-core/lib/events/IPublisher";
import ISubscriber from "minions-core/lib/events/ISubscriber";
import SubscriberCallback from "minions-core/lib/events/SubscriberCallback";
import KafkaEventBridgeOptions from "./KafkaEventBridgeOptions";

export default class KafkaEventBridge extends HTMLElement implements IPublisher, ISubscriber, EventListenerObject {
    private readonly callbacks: Array<SubscriberCallback> = new Array<SubscriberCallback>();
    private readonly webSocket: WebSocket;
    
    constructor(options: KafkaEventBridgeOptions) {
        super();

        this.webSocket = new WebSocket(options.signalREndpoint);

        this.webSocket.onmessage = (event) => {
            const payload = event.data as IEvent;

            this.callbacks.forEach((callback) => {
                callback(payload);
            });
        };
    }
    
    publish(event: IEvent): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (event !== undefined && this.webSocket.readyState === WebSocket.OPEN) {
                this.webSocket.send(JSON.stringify(event));

                resolve(true);
            };

            resolve(false);
        });
    }

    subscribe(callback: SubscriberCallback): any {
        this.callbacks.push(callback);
    }

    handleEvent(domEvent: Event): void {
        //TODO: Implement concept for intercepting DOM events and mapping them to commands.
        console.log(domEvent, this.id);
    }
}