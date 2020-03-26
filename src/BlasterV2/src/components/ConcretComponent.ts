import { html, property, customElement, TemplateResult } from "lit-element";
import WebComponent from "minions-core/lib/components/WebComponent";
import KafkaEventBridgePlugin from "minions-plugins-kafka/lib/KafkaEventBridgePlugin";
import KafkaEventBridgePluginLoader from "minions-plugins-kafka/lib/KafkaEventBridgePluginLoader";

const componentIdentifier = "dfds-concret-component";

@customElement(componentIdentifier)
export default class ConcretComponent extends WebComponent {
    @property({ type: String }) message = "Click me!";

    constructor() {
        super({
            identifier: componentIdentifier,
            plugins: [new KafkaEventBridgePlugin({
                signalREndpoint: "http://localhost:50900/events/signalr-hub",
                domEventMap: [componentIdentifier]
            })]
        },
        [new KafkaEventBridgePluginLoader()]);

        this.dispatchEvent(new CustomEvent(this.identifier as string, {
            bubbles: false,
            composed: true,
            detail: (event: any) => { console.log(event); }
        }));
    }

    onClick(){
        this.dispatchEvent(
            new CustomEvent(this.identifier as string, {
                bubbles: false,
                composed: true,
                detail: this.message
            })
        );
    }

    render(): TemplateResult {
        return html`<button @click="${this.onClick}">${this.message}</button>`;
    }
}