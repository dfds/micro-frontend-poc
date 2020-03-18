import WebComponent from "minions-core/lib/components/WebComponent";
import { html, property, customElement, TemplateResult } from "lit-element";


const componentIdentifier = "dfds-devex-capabilitydashboard-component";

@customElement(componentIdentifier)
export default class CapabilityDashboardComponent extends WebComponent {
    @property({type: Array}) capabilities = ["xaxa", "sandbox-emcla"];

    constructor() {
        super({
            identifier: componentIdentifier,
            plugins: []
        }, []);
    }

    render(): TemplateResult {
        return html`
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