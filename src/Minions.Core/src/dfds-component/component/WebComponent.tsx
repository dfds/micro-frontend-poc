import React from "react";
import ReactDOM from "react-dom";
import IPlugin from "../plugins/IPlugin";
import { EventProvider } from "../events/EventContext";
import createProxyRoot from "../services/proxyRoot";
import addStyledComponentStyles from "../services/styledComponentsHandler";
import includeExternalSources from "../services/externalSourceHandler";
import loadFonts from "../services/fontLoaderHandler";
import includePolyfills from "../services/polyfillHandler";
import includeGoogleIcons from "../services/iconLoaderHandler";

class WebComponent {
    private readonly reactContext: React.FC<any> | React.ComponentClass<any, any>;
    private readonly componentAttributes: any;
    private readonly componentProperties: any;
    private readonly shadow: boolean | undefined;
    private readonly plugins: IPlugin[] | undefined;
    private readonly connectCallback: (element: HTMLElement) => void;

    constructor(
        context: React.FC<any> | React.ComponentClass<any, any>,
        properties: any,
        shadowOption: boolean,
        plugins: IPlugin[] | undefined,
        connectCallback: (element: HTMLElement) => void)
    {
        this.reactContext = context;
        this.componentAttributes = {};
        this.componentProperties = properties;
        this.shadow = shadowOption;
        this.plugins = plugins;
        this.connectCallback = connectCallback;
    }
    
    //All properties with primitive values is added to attributes.
    private reflectPropertiesToAttributes(): void {
        Object.entries(this.componentProperties).forEach(([key, value]) => {
            if (typeof value !== "number" && typeof value !== "string" && typeof value !== "boolean") {
                return;
            }

            this.componentAttributes[key] = value;
        });
    }

    async initialize(): Promise<any> {
        const component = this;

        /**
         * Wait for Web Component polyfills to be included in the host application.
         * Polyfill scripts are loaded async.
         */
        await includePolyfills({ usesShadow: !!component.shadow }, this.plugins);

        return class extends HTMLElement {
            private reactApplication: JSX.Element | undefined;

            constructor() {
                super();
                this.subscribeToProperties();
            }

            /**
             * Observe attributes for changes.
             * Part of the Web Component Standard.
             */
            public static get observedAttributes(): string[] {
                return Object.keys(component.componentAttributes).map((k) => k.toLowerCase());
            }

            /**
             * Web Component gets mounted on the DOM.
             */
            public connectedCallback(): void {
                this.preparePropertiesAndAttributes();
                this.preparePlugins();
                this.mountReactApp({ initial: true });

                component.connectCallback(this);
            }

            /**
             * When an attribute is changed, this callback function is called.
             * @param name name of the attribute
             * @param oldValue value before change
             * @param newValue value after change
             */
            public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
                if (oldValue === newValue) {
                    return;
                }

                this.mountReactApp();
            }

            /**
             * When a property is changed, this callback function is called.
             * @param name name of the property
             * @param oldValue value before change
             * @param newValue value after change
             */
            public propertyChangedCallback(name: string, oldValue: any, newValue: any): void {
                if (oldValue === newValue) {
                    return;
                }

                component.componentProperties[name] = newValue;

                this.mountReactApp();
            }

            /**
             * Web Component gets unmounted from the DOM.
             */
            public disconnectedCallback(): void {
                ReactDOM.unmountComponentAtNode(this);
            }

            /**
             * Setup getters and setters for all properties.
             * Here we ensure that the 'propertyChangedCallback' will get invoked
             * when a property changes.
             */
            private subscribeToProperties(): void {
                if (!component.reactContext) {
                    return;
                }

                const properties = Object.assign({}, component.componentProperties);
                const self: any = this;

                for (const key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        if (self[key] != null) {
                            properties[key] = self[key];
                        }
                    }
                }

                const propertyMap = {} as PropertyDescriptorMap;
                Object.keys(properties).forEach((key: string) => {
                    const presetValue = self[key];

                    propertyMap[key] = {
                        configurable: true,
                        enumerable: true,

                        get(): any {
                            return presetValue || properties[key];
                        },

                        set(newValue: any): any {
                            const oldValue = properties[key];
                            properties[key] = newValue;
                            self.propertyChangedCallback(key, oldValue, newValue);
                        },
                    };
                });

                Object.defineProperties(self, propertyMap);
            }

            /**
             * Prepare all properties and attributes
             */
            private preparePropertiesAndAttributes(): void {
                const self: any = this;

                Object.keys(component.componentProperties).forEach((key: string) => {
                    if (self.getAttribute(key)) {
                        component.componentProperties[key] = self.getAttribute(key);
                    } else if (self[key] != null) {
                        component.componentProperties[key] = self[key];
                    }
                });
            }

            /**
             * Fetch and prepare all plugins.
             */
            private preparePlugins(): void {
                loadFonts(component.plugins);
                includeGoogleIcons(this, component.plugins);
                includeExternalSources(this, component.plugins);
                addStyledComponentStyles(this, component.plugins);
            }

            /**
             * Generate react props based on properties and attributes.
             */
            private reactProps(): any {
                component.reflectPropertiesToAttributes();
                return { ...component.componentProperties };
            }
            
            /**
             * Create the React App
             */
            private application(): JSX.Element {
                if (this.reactApplication) {
                    return this.reactApplication;
                }

                const baseApplication = (
                    <EventProvider value={this.eventDispatcher}>
                        {React.createElement(component.reactContext, this.reactProps())}
                    </EventProvider>
                );

                return baseApplication;
            }

            /**
             * Dispatch an event on behalf of the Web Component
             */
            private eventDispatcher = (event: Event) => {
                this.dispatchEvent(event);
            }
            
            /**
             * Mount React App onto the Web Component
             */
            private mountReactApp(options?: { initial: boolean; }): void {
                const application = this.application();

                if (!component.shadow) {
                    ReactDOM.render(application, this);
                } else {

                    let currentChildren: Node[] | undefined;

                    if (options?.initial) {
                        currentChildren = Array.from(this.children).map((child: Node) =>
                            child.cloneNode(true),
                        );
                    }

                    const root = createProxyRoot(this);
                    ReactDOM.render(<root.open>{application}</root.open>, this);

                    if (currentChildren) {
                        currentChildren.forEach((child: Node) => this.append(child));
                    }
                }
            }
        };
    }
}

export default WebComponent;