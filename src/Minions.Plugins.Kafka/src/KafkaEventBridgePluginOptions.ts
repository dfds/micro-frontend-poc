export default class KafkaEventBridgePluginOptions {
    get capabilityIdentifier(): string {
        return "foobar-xueqz";
    }

    get topic(): string {
        return "foobar-topic";
    }

    get events(): string[] {
        return ["fooEvent", "barEvent"];
    }
}