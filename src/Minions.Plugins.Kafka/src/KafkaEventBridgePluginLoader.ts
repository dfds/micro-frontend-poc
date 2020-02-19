import IPlugin from "minions-core/lib/plugins/IPlugin";
import IPluginLoader from "minions-core/lib/plugins/IPluginLoader";

export default class KafkaEventBridgePluginLoader implements IPluginLoader {
    canLoad(plugin: IPlugin): boolean {
        return this.validateOptions(plugin.options);
    }

    load(plugin: IPlugin): void {
        throw new Error("Method not implemented.");
    }

    private validateOptions(options: any): boolean {
        

        return true;
    }
}