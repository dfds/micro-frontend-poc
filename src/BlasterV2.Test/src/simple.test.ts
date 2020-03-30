import ConcretComponent from "@dfds-devex/dfds-blaster-v2/lib/components/ConcretComponent";
import CapabilityDashboardComponent from "@dfds-devex/dfds-blaster-v2/lib/components/CapabilityDashboardComponent";
import { fixture, html } from '@open-wc/testing';

const assert: any = chai.assert;

suite("BlasterV2 ConcretComponent", () => {
    test("is defined", () => {
        //Arrange & Act
        const el = document.createElement("dfds-concret-component");

        //Assert
        assert.instanceOf(el, ConcretComponent);
    });

    test("renders with default values", async () => {
        //Arrange & Act
        const el = await fixture(html`<dfds-concret-component></dfds-concret-component>`);

        //Assert
        assert.shadowDom.equal(el, `<h1>Hello, World!</h1>`);
    });

    test("renders with set message", async () => {
        //Arrange & Act
        const el = await fixture(html`<dfds-concret-component message="Foo!"></dfds-concret-component>`);

        //Assert
        assert.shadowDom.equal(el, `<h1>Foo!</h1>`);
    });
});

suite("BlasterV2 CapabilityDashboardComponent", () => {
    test("is defined", () => {
        const el = document.createElement("dfds-devex-capabilitydashboard-component");

        assert.instanceOf(el, CapabilityDashboardComponent);
    })
});