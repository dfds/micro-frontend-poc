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
        <h1 @click=${this.interact}>${this.enabled}</h1>
            ${(this.capabilities as Array<Capability>).map(cap => html`
            <div class="capability">
              <h2>${cap.Name}</h2>
            </div>
            `)}
        </div>
        `;
    }

    updateEnable() : void {
        this.enabled = true;
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
        var oldCap = this.capabilities.slice();
        var oldEnabled = this.enabled;
        //this.capabilities.push(new Date().toLocaleDateString());
        this.enabled = !this.enabled;
        this.requestUpdate('enabled', oldEnabled);
        this.requestUpdate('capabilities', oldCap).then(() => console.log("Update completed"));
        console.log(this.capabilities);
        console.log(this.enabled);
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