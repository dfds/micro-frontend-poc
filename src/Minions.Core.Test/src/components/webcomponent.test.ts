import Minion from "@dfds-devex/minions-core/lib/Minion";
import WebComponent from "@dfds-devex/minions-core/lib/components/WebComponent";

const expect: any = chai.expect;

suite("Minions.Components.WebComponent", () => {
    test("module exports WebComponent class", () => {
        expect(WebComponent).to.equal(WebComponent);
    });

    test("WebComponent class has render method", () => {
        expect((typeof WebComponent.render === "function")).to.equal(true);
    });

    test("WebComponent class inherits from Minion class", () => {
        expect(WebComponent.prototype instanceof Minion).to.equal(true);
    });
});