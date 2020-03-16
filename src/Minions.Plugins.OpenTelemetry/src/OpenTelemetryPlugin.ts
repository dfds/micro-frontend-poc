import IPlugin from "minions-core/lib/plugins/IPlugin";
import OpenTelemetryClient from "./OpenTelemetryClient";
import OpenTelemetryPluginOptions from "./OpenTelemetryPluginOptions";

export const pluginIdentifier: string = "OpenTelemetryPlugin";

export default class OpenTelemetryPlugin implements IPlugin {
    options: OpenTelemetryPluginOptions;
    name = pluginIdentifier;

    constructor(options?: OpenTelemetryPluginOptions) {
        this.options = options as OpenTelemetryPluginOptions;
    }

    initialize(context?: any): Promise<void> {
        return new Promise<void>((resolve) => {
            //TODO: Decide what and how to expose telemetry client.
            console.log(new OpenTelemetryClient(this.options), context);

            resolve();
        });
    }
}