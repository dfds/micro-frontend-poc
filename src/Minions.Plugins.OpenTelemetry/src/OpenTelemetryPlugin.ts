import IPlugin from "minions-core/lib/plugins/IPlugin";
import OpenTelemetryPluginOptions from "./OpenTelemetryPluginOptions";

export const pluginIdentifier: string = "OpenTelemetryPlugin";

export default class OpenTelemetryPlugin implements IPlugin {
    options: OpenTelemetryPluginOptions;
    name = pluginIdentifier;

    constructor(options: OpenTelemetryPluginOptions) {
        this.options = options;
    }

    initialize(context?: any): Promise<void> {
        return new Promise<void>((resolve) => {
            //TODO: Implement plugin
            console.log(context);

            resolve();
        });
    }
}