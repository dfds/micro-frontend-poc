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
            plugins: [new KafkaEventBridgePlugin({ signalREndpoint: "wss://", domEventMap: [componentIdentifier] })]
        },
        [new KafkaEventBridgePluginLoader()]);
    }

    onClick(){
        this.dispatchEvent(
            new CustomEvent(this.identifier as string, {
                bubbles: true,
                composed: true,
                detail: this.message
            })
        );
    }

    render(): TemplateResult {
        return html`<button @click="${this.onClick}">${this.message}</button>`;
    }
}