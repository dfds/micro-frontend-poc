import IPlugin from "minions-core/lib/plugins/IPlugin";
import KafkaEventBridge from "./KafkaEventBridge";
import KafkaEventBridgePluginOptions from "./KafkaEventBridgePluginOptions";
import KafkaEventBridgeOptions from "./KafkaEventBridgeOptions";

export const pluginIdentifier: string = "KafkaEventBridgePlugin";

export default class KafkaEventBridgePlugin implements IPlugin {
    options: KafkaEventBridgePluginOptions;
    name = pluginIdentifier;

    constructor(options: KafkaEventBridgePluginOptions) {
        this.options = options;
    }

    public initialize(context?: any): Promise<void> {
        return new Promise<void>((resolve) => {
            if (context instanceof HTMLElement) {
                const eventBridgeOptions = new KafkaEventBridgeOptions();
                eventBridgeOptions.signalREndpoint = this.options.signalREndpoint;
                
                const eventBridgeNode = context.appendChild(new KafkaEventBridge(eventBridgeOptions));

                this.options.domEventMap.forEach((eventName: string) => {
                    context.addEventListener(eventName, eventBridgeNode);
                });

                resolve();
            }
        });
    }
}