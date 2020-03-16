import ConcretComponent from "./components/ConcretComponent";

export default class Application {
    constructor() {
        let component = new ConcretComponent();

        component.render();
    }
}