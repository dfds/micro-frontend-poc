import { Minion } from "minions.core/src/Minion";
import { WebComponent } from "minions.core/src/components/WebComponent";

describe("WebComponent tests", () => {
    test("Ensure export", () => {
        expect(WebComponent).toBeDefined();
    });
});