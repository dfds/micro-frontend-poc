import KafkaEventBridge from "minions-plugins-kafka/lib/KafkaEventBridge";

const expect: any = chai.expect;

suite("Minions.Plugins.Kafka.KafkaEventBridge", () => {
    test("should return true", () => {
        var result = new KafkaEventBridge({ signalREndpoint: "wss://localhost:50900/events/signalr-hub"});

        console.log(result.connection.send("hello world"));
        
        result.publish({ id: "", version: "", payload: "", source: "" });

        expect(result).to.equal(result);
    });
});