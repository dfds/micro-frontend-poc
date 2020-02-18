import { html, property, customElement, LitElement } from "lit-element";
import { WebComponent } from "minions-core/components/WebComponent";

@customElement("foo")
export class ConcretComponent extends LitElement {
    constructor() {
        super();
    }

    //@property({ type: String }) message = "Hello world";

    //TODO: Figure out why returning TemplateResult causes an inheritance error (its some module shait)
    render(): any {
        return undefined; //html`${this.message}`;
    }
}