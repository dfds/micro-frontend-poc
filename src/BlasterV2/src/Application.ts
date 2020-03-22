import '../style/application.scss';

import CapabilityDashboardComponent from "./components/CapabilityDashboardComponent";

export default class Application {
    dashboard : CapabilityDashboardComponent = {} as any;

    constructor() {
        this.dashboard = new CapabilityDashboardComponent();

        let result = this.dashboard.render();
        console.log(result);
    }
}

export {Application}