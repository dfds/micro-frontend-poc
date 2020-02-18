import { html, property, customElement, TemplateResult } from "lit-element";
import { WebComponent } from "minions-core/lib/components/WebComponent";

@customElement("dfds-concret-component")
export class ConcretComponent extends WebComponent {
    constructor() {
        super();
    }

    @property({ type: String }) message = "Hello, World!";

    render(): TemplateResult {
        return html`<h1>${this.message}</h1>`;
    }
}