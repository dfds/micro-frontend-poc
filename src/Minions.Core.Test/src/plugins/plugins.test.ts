import IPlugin from "minions-core/lib/plugins/IPlugin";
import IPluginLoader from "minions-core/lib/plugins/IPluginLoader";

const expect: any = chai.expect;

suite("Minions.Core.Plugins", () => {
    test("module exports IPlugin type", () => {
        const plugin: IPlugin = {
            name: "foo", initialize: async () => {}
        };

        expect(plugin).to.equal(plugin);
    });

    test("module exports IPluginLoader type", () => {
        const pluginLoader: IPluginLoader = {
            canLoad: (plugin: IPlugin) => { return plugin !== undefined; },
            load: async () => {}
    };

        expect(pluginLoader).to.equal(pluginLoader);
    });
});