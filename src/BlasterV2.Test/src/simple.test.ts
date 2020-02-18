import { WebComponent } from "minions.core/components/WebComponent";

const expect: any = chai.expect;

suite("Minions.WebComponent", () => {
    test("should return true", () => {
        var result = WebComponent;

        expect(result).to.equal(result);
    });
});