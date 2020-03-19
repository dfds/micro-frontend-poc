import IEvent from "minions-core/lib/events/IEvent";
import EventCallback from "minions-core/lib/events/EventCallback";
import IPublisher from "minions-core/lib/events/IPublisher";
import ISubscriber from "minions-core/lib/events/ISubscriber";
import KafkaEventBridgeOptions from "./KafkaEventBridgeOptions";

export default class KafkaEventBridge extends HTMLElement implements IPublisher, ISubscriber, EventListenerObject {
    private readonly callbacks: Array<EventCallback> = new Array<EventCallback>();
    private readonly webSocket: WebSocket;
    private readonly options: KafkaEventBridgeOptions;
    
    constructor(options: KafkaEventBridgeOptions) {
        super();

        this.options = options;
        this.webSocket = new WebSocket(this.options.signalREndpoint);

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

    subscribe(callback: EventCallback): boolean {
        const currentCount = this.callbacks.length;

        return this.callbacks.push(callback) > currentCount;
    }

    handleEvent(domEvent: Event): void {
        if (domEvent.composed && domEvent instanceof CustomEvent) {
            if (typeof domEvent.detail === "function") {
                this.subscribe((domEvent.detail as any) as EventCallback);
            }
            else {
                this.publish({
                    id: domEvent.type,
                    version: domEvent.timeStamp.toString(),
                    payload: domEvent.detail,
                    source: domEvent.srcElement
                });
            }
        }
    }
}