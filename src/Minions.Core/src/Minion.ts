import { LitElement } from "lit-element";
import IPlugin from "./plugins/IPlugin";
import IPluginLoader from "./plugins/IPluginLoader";

//IDEA.TODO: Read this @ https://www.typescriptlang.org/docs/handbook/mixins.html
//IDEA.TODO: Read this @ https://mariusschulz.com/blog/mixin-classes-in-typescript
export abstract class Minion extends LitElement {
    protected readonly options: IOptions | undefined;

    get plugins(): IPlugin[] | undefined {
        if (this.options !== undefined) {
            return this.options.plugins;
        }

        return undefined;
    }

    get identifier(): string | undefined {
        if (this.options !== undefined) {
            return this.options.identifier;
        }

        return undefined;
    }

    protected constructor(options?: IOptions, loader?: IPluginLoader) {
        super();

        this.options = options;

        if (this.plugins !== undefined) {
            this.plugins.forEach((plugin: any) => {
                if (loader !== undefined) {
                    if (loader.canLoad(plugin))
                    {
                        loader.load(plugin);
                    }
                }
            });
        }
    }
}

export interface IOptions {
    identifier: string;
    plugins?: IPlugin[];
}