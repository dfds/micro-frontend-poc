import IPlugin from "minions-core/lib/plugins/IPlugin";
import IEvent from "minions-core/lib/events/IEvent";
import KafkaEventBridge from "./KafkaEventBridge";
import KafkaEventBridgePluginOptions from "./KafkaEventBridgePluginOptions";
import KafkaEventBridgeOptions from "./KafkaEventBridgeOptions";
import SubscriberCallback from "minions-core/lib/events/SubscriberCallback";

export const pluginIdentifier: string = "KafkaEventBridgePlugin";

export default class KafkaEventBridgePlugin implements IPlugin {
    options: KafkaEventBridgePluginOptions;
    name = pluginIdentifier;

    constructor(options: KafkaEventBridgePluginOptions) {
        this.options = options;
    }

    initialize(context?: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const eventBridgeOptions = new KafkaEventBridgeOptions();
            eventBridgeOptions.signalREndpoint = this.options.signalREndpoint;

            const eventBridge = new KafkaEventBridge(eventBridgeOptions);

            if (context instanceof HTMLElement) {
                const eventBridgeNode = context.appendChild(eventBridge);

                this.options.domEventMap?.forEach((eventName: string) => {
                    context.addEventListener(eventName, eventBridgeNode);
                });
            }

            if (context !== undefined) {
                context.subscribe = (callback: SubscriberCallback) => {
                    eventBridge.subscribe(callback);
                };

                context.publish = (event: IEvent) => {
                    eventBridge.publish(event);
                };
            }

            resolve();
        });
    }
}