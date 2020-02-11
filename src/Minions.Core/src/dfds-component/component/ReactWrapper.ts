import React from "react";
import IComponentConfig from "./IComponentConfig";
import IPlugin from "../interfaces/IPlugin";
import WebComponent from "./WebComponent";

class ReactWrapper {
    private reactContext: React.FC<any> | React.ComponentClass<any, any> | undefined;
    private webComponent: any | undefined;
    private readonly componentProperties: any | undefined;
    private readonly shadow:boolean = true;
    private readonly elementName: string | undefined;
    private readonly plugins: IPlugin[] | undefined;

    constructor(config: IComponentConfig)
    {
        this.componentProperties = config.properties;
        this.shadow = config.useShadow;
        this.elementName = config.name;
        this.plugins = config.plugins;
    }

    create(context: React.FC<any> | React.ComponentClass<any, any>): Promise<HTMLElement> {
        return new Promise(async (resolve, reject) =>
        {
            this.reactContext = context;

            try {
                this.validateDependencies();
            }
            catch (error) {
                reject(error);
            }
            finally {
                const callback = (element: HTMLElement) => {
                    resolve(element);
                };

                this.webComponent = new WebComponent(
                    this.reactContext,
                    this.componentProperties || {},
                    this.shadow,
                    this.plugins,
                    callback
                );

                await this.webComponent.initialize();

                customElements.define(this.elementName || "", this.webComponent);
            }
        });
    }

    private validateDependencies(): void
    {
        if (!this.webComponent)
        {
            throw Error("Cannot define custom element: Root Component have not been set.");
        }

        if (!this.elementName)
        {
            throw Error("Cannot define custom element: Element name has not been set.");
        }
    }
}

export default ReactWrapper;