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
    @property({type: Boolean}) enabled = false;

    constructor() {
        super({
                identifier: componentIdentifier,
                plugins: [new KafkaEventBridgePlugin({
                    signalREndpoint: "ws://localhost:50900/events/signalr-hub",
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
        ${this.enabled}
            ${this.capabilities.map(cap => html`
            <div class="capability">
              <h2>${cap}</h2>
            </div>
            `)}
        </div>
        `;
    }

    shouldUpdate(changedProperties : any) : boolean {
        console.log("shouldUpdate:", changedProperties);
        return true;
    }

    interact(): void {
        var oldCap = this.capabilities.slice();
        var oldEnabled = this.enabled;
        this.capabilities.push(new Date().toLocaleDateString());
        this.enabled = !this.enabled;
        this.requestUpdate('enabled', oldEnabled);
        //this.requestUpdate('capabilities', oldCap).then(() => console.log("Update completed"));
        console.log(this.capabilities);
        console.log(this.enabled);
    }
}