import IPlugin from "./IPlugin"

interface IPluginLoader {
    canLoad(plugin: IPlugin): boolean;
    load(plugin: IPlugin): void;
}

export default IPluginLoader;