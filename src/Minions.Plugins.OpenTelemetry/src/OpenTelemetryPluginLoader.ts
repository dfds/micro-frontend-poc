import IPlugin from "@dfds-devex/minions-core/lib/plugins/IPlugin";
import IPluginLoader from "@dfds-devex/minions-core/lib/plugins/IPluginLoader";
import OpenTelemetryPlugin, { pluginIdentifier } from "./OpenTelemetryPlugin";

export default class OpenTelemetryPluginLoader implements IPluginLoader {
    canLoad(plugin: IPlugin): boolean {
        return (plugin as OpenTelemetryPlugin) !== undefined;
    }

    load(plugin: IPlugin, context?: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (plugin.name === pluginIdentifier) {
                plugin.initialize(context).then(resolve, reject);
            } else {
                reject("Unsupported plugin");
            }
        });
    }
}