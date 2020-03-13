import IEvent from "./IEvent";

type SubscriberCallback = (event: IEvent) => Promise<boolean>;

export default SubscriberCallback;