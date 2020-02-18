import { html, property, customElement, TemplateResult } from "lit-element";
import { WebComponent } from "minions.core/components/WebComponent";

@customElement("foo")
export class ConcretComponent extends WebComponent {
    constructor() {
        super();
    }

    @property({ type: String }) message = "Hello world";

    render(): TemplateResult {
        return html`${this.message}`;
    }
}