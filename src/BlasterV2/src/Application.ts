//import ConcretComponent from "./components/ConcretComponent";
import CapabilityDashboardComponent from "./components/CapabilityDashboardComponent";

export default class Application {
    constructor() {
        let capDashboardComponent = new CapabilityDashboardComponent();

        let result = capDashboardComponent.render();
        console.log(result);
    }
}

export {Application}