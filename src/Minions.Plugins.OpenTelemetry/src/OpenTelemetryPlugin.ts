import IPlugin from "minions-core/lib/plugins/IPlugin";
import OpenTelemetryPluginOptions from "./OpenTelemetryPluginOptions";
import OpenTelemetryClient from "./OpenTelemetryClient";
import OpenTelemetryClientOptions from "./OpenTelemetryClientOptions";

export const pluginIdentifier: string = "OpenTelemetryPlugin";

export default class OpenTelemetryPlugin implements IPlugin {
    options: OpenTelemetryPluginOptions;
    name = pluginIdentifier;

    constructor(options: OpenTelemetryPluginOptions) {
        this.options = options;
    }

    initialize(context?: any): Promise<void> {
        return new Promise<void>((resolve) => {
            const openTelemetryClientOptions = new OpenTelemetryClientOptions();
            const openTelemetryClient = new OpenTelemetryClient(openTelemetryClientOptions);
            
            console.log(openTelemetryClient, context);

            resolve();
        });
    }
}