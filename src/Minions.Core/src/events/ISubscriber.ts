import SubscriberCallback from "./SubscriberCallback";

interface ISubscriber{
    subscribe(callback: SubscriberCallback): boolean;
}

export default ISubscriber;
