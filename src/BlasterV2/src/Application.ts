import CapabilityDashboardComponent from "./components/CapabilityDashboardComponent";

export default class Application {
    dashboard : CapabilityDashboardComponent = {} as any;

    constructor() {
        this.dashboard = new CapabilityDashboardComponent();
    }
}

export { Application }

var app = new Application();

console.log(app);