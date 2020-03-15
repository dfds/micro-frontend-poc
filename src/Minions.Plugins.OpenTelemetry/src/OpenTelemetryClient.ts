import { WebTracerProvider } from "@opentelemetry/web";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/tracing";
import { DocumentLoad } from "@opentelemetry/plugin-document-load";
import { UserInteractionPlugin } from "@opentelemetry/plugin-user-interaction";
//TODO: Figure out why XML HTTP Request plugin doesnt work.
//import { XMLHttpRequestPlugin } from "@opentelemetry/plugin-xml-http-request";

export default class OpenTelemetryClient extends HTMLElement implements EventListenerObject {
    constructor() {
        super();
        
        const provider = new WebTracerProvider({
            plugins: [
                new DocumentLoad(),
                new UserInteractionPlugin()
            ]
        });

        //TODO: Implement more complex processor
        provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    }

    handleEvent(domEvent: Event): void {
        //TODO: Implement concept for intercepting DOM events and mapping them to commands.
        console.log(domEvent, this.id);
    }
}