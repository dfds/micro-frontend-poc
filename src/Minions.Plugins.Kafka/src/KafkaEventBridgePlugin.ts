import IPlugin from "minions-core/lib/plugins/IPlugin";
import KafkaEventBridge from "./KafkaEventBridge";
import KafkaEventBridgePluginOptions from "./KafkaEventBridgePluginOptions";

export const pluginIdentifier: string = "KafkaEventBridgePlugin";

export default class KafkaEventBridgePlugin implements IPlugin {
    private _options: KafkaEventBridgePluginOptions;

    get name(): string {
        return pluginIdentifier;
    }

    public get options(): any {
        return this._options;
    }

    constructor(options: KafkaEventBridgePluginOptions) {
        this._options = options;
    }

    public initialize(context?: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (context instanceof HTMLElement) {
                const eventBridgeNode = context.appendChild(new KafkaEventBridge());

                this.options.events.forEach((event: string) => {
                    context.addEventListener(event, eventBridgeNode);
                }).then(resolve, reject);
            }
        });
    }
}