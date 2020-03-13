interface IEvent {
    id: string;
    version: string;
    payload: any;
    source: any;
    inProcessRecipients: any[];
}

export default IEvent;