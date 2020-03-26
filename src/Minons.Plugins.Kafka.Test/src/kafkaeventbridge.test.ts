import KafkaEventBridge from "minions-plugins-kafka/lib/KafkaEventBridge";

const expect: any = chai.expect;

suite("Minions.Plugins.Kafka.KafkaEventBridge", () => {
    test("module exports KafkaEventBridge class", () => {
        const result = new KafkaEventBridge({ signalREndpoint: "http://localhost:50900/events/signalr-hub"});
        
        expect(result).to.equal(result);
    });

    test("KafkaEventBridge can publish", () => {
        const result = new KafkaEventBridge({ signalREndpoint: "http://localhost:50900/events/signalr-hub" });
        const publishPromise = result.publish({ id: "test_event", version: "test_version", payload: "test_payload", source: "test_source" });

        publishPromise.then((resolve) => {
            expect(resolve).to.equal(true);
        });
    });

    test("KafkaEventBridge can subscribe", () => {
        const result = new KafkaEventBridge({ signalREndpoint: "http://localhost:50900/events/signalr-hub" });
        
        expect(result.subscribe(async (event: any) => { return event !== undefined; })).to.equal(true);
    });
});