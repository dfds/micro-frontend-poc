import IPublisher from "minions-core/lib/events/IPublisher";

export default class KafkaEventPublisher implements IPublisher {
    get options(): any {
        return { capabilityId: "foobar-xueqz" };
    }
}