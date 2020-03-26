import IPlugin from "@dfds-devex/minions-core/lib/plugins/IPlugin";
import OpenTelemetryClient from "./OpenTelemetryClient";
import OpenTelemetryPluginOptions from "./OpenTelemetryPluginOptions";

export const pluginIdentifier: string = "OpenTelemetryPlugin";

export default class OpenTelemetryPlugin implements IPlugin {
    protected telemetryClient: OpenTelemetryClient | undefined;
    options: OpenTelemetryPluginOptions;
    name = pluginIdentifier;

    constructor(options?: OpenTelemetryPluginOptions) {
        this.options = options as OpenTelemetryPluginOptions;
    }

    initialize(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.telemetryClient = new OpenTelemetryClient(this.options);

            resolve();
        });
    }
}