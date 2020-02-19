import IPlugin from "minions-core/lib/plugins/IPlugin";

export default class KafkaEventBridgePlugin implements IPlugin {
    get name(): string {
        return "KafkaEventBridgePlugin";
    }

    get options(): any {
        return { endpoint: "foo", topic: "bra" };
    }

    constructor() {
        var socket = new SockJS();
    }
}