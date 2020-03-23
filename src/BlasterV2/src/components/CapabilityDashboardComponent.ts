import WebComponent from "minions-core/lib/components/WebComponent";
import { html, property, customElement, TemplateResult } from "lit-element";
import KafkaEventBridgePlugin from "minions-plugins-kafka/lib/KafkaEventBridgePlugin";
import KafkaEventBridgePluginLoader from "minions-plugins-kafka/lib/KafkaEventBridgePluginLoader";
// @ts-ignore
import CSS from '../../style/CapabilityDashboardComponent-css.js';

const axios = require('axios').default;

const componentIdentifier = "dfds-devex-capabilitydashboard-component";

const devToken = '';

@customElement(componentIdentifier)
export default class CapabilityDashboardComponent extends WebComponent {
    @property({type: Array}) capabilities = [];
    @property({type: Boolean}) enabled = false;

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
            detail: (event: any) => {
                console.log("Subscriber callback event", event);
            }
        }));
    }

    render(): TemplateResult {
        return html`
        ${CSS}
        <div class="capabilityList">
            <h1 @click=${this.interact}>${this.enabled}</h1>

            <table class="table is-fullwidth is-hoverable" v-if="hasCapabilities">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Joined</th>
                    <th>Overview</th>
                    <th>Service indicators</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                ${(this.capabilities as Array<Capability>).map(cap => html`
                <tr>
                    <td>${cap.Name}</td>
                    <td></td>
                    <td>
                        <span class="icon">
                            <i class="far fa-chart-bar"></i>
                        </span>
                    </td>
                    <td>
                        <span class="icon">
                            <i class="fas fa-tasks"></i>
                        </span>
                    </td>
                    <td>
                        Ready
                    </td>                    
                </tr>
                `)}
            </tbody>
        </table>

        </div>
        `;
    }

    shouldUpdate(changedProperties : any) : boolean {
        console.log("shouldUpdate:", changedProperties);
        return true;
    }

    firstUpdated(_propertyValues : any): void {
        axios({
            url: '/api/capsvc/capabilities',
            method: 'get',
            headers: {'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + devToken}
        })
        .then((resp : any) => {
            console.log(resp);
            if (resp.status === 200) {
                let oldCap = this.capabilities.slice();
                this.capabilities = resp.data.items.map((cap : any) => {
                    let capability = new Capability();
                    capability.Name = cap.name;
                    capability.RootId = cap.rootId;
                    capability.Id = cap.id;
                    capability.Description = cap.description;
                    return capability;
                })
                this.requestUpdate('capabilities', oldCap).then(() => console.log("Update completed"));
            } else {
                console.log(resp);
                console.log("ERR, DIDN'T GET SUCCESS RESPONSE FOR CAPABILITIES");
            }
        });
    }

    interact(): void {
        var oldEnabled = this.enabled;
        this.enabled = !this.enabled;
        this.requestUpdate('enabled', oldEnabled);
    }
}

class Capability {
    Name : string;
    RootId : string;
    Id : string;
    Description : string;
    Members : Member[];
    Contexts : Context[];

    constructor() {
        this.Name = "";
        this.RootId = "";
        this.Id = "";
        this.Description = "";
        this.Members = [];
        this.Contexts = [];
    }
}

class Member {
    Email : string;

    constructor() {
        this.Email = "";
    }
}

class Context {
    Id : string;
    Name : string;

    constructor() {
        this.Id = "";
        this.Name = "";
    }
}