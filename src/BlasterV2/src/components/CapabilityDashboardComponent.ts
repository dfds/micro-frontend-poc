import WebComponent from "minions-core/lib/components/WebComponent";
import { html, property, customElement, TemplateResult } from "lit-element";
import KafkaEventBridgePlugin from "minions-plugins-kafka/lib/KafkaEventBridgePlugin";
import KafkaEventBridgePluginLoader from "minions-plugins-kafka/lib/KafkaEventBridgePluginLoader";
// @ts-ignore
import CSS from '../../style/CapabilityDashboardComponent-css.js';

const componentIdentifier = "dfds-devex-capabilitydashboard-component";

@customElement(componentIdentifier)
export default class CapabilityDashboardComponent extends WebComponent {
    @property({type: Array}) capabilities = ["xaxa", "sandbox-emcla", "hoooray", "smartdata-aq", "Bosphorous", "ded-infrastructure"];

    constructor() {
        super({
                identifier: componentIdentifier,
                plugins: [new KafkaEventBridgePlugin({
                    signalREndpoint: "wss://echo.websocket.org",
                    domEventMap: [componentIdentifier]
                })]
            },
            [new KafkaEventBridgePluginLoader()]);

        this.dispatchEvent(new CustomEvent(this.identifier as string, {
            bubbles: false,
            composed: true,
            detail: (event: any) => {
                console.log("Subscriber callback event", event);
            }
        }));
    }

    render(): TemplateResult {
        return html`
        ${CSS}
        <div class="capabilityList">
            ${this.capabilities.map(cap => html`
            <div class="capability">
              <h2>${cap}</h2>
            </div>
            `)}
        </div>
        `;
    }
}