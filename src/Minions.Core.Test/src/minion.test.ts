import { LitElement } from "lit-element";
import Minion from "minions-core/lib/Minion";

const expect: any = chai.expect;

suite("Minions.Core", () => {
    test("module exports Minion type", () => {
        expect(Minion).to.equal(Minion);
    });

    test("Minion class inherits from LitElement class", () => {
        expect(Minion.prototype instanceof LitElement).to.equal(true);
    });
});