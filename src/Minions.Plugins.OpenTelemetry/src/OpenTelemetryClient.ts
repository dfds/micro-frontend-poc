import OpenTelemetryClientOptions from "./OpenTelemetryClientOptions";
import * as Api from "@opentelemetry/api";
import { WebTracerProvider } from "@opentelemetry/web";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/tracing";
import { CollectorExporter } from "@opentelemetry/exporter-collector";
import { DocumentLoad } from "@opentelemetry/plugin-document-load";
import { XMLHttpRequestPlugin } from "@opentelemetry/plugin-xml-http-request";

export default class OpenTelemetryClient implements EventListenerObject {
    private readonly options: OpenTelemetryClientOptions;

    constructor(options: OpenTelemetryClientOptions) {
        this.options = options;

        const provider = new WebTracerProvider({
            scopeManager: this.options?.defaultScopeManager,
            plugins: [
                new DocumentLoad(),
                new XMLHttpRequestPlugin(this.options) as any
            ]
        });

        provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
        provider.addSpanProcessor(new SimpleSpanProcessor(new CollectorExporter()));

        Api.trace.initGlobalTracerProvider(provider);
    }

    handleEvent(domEvent: Event): void {
        //TODO: Implement concept for intercepting DOM events and mapping them to commands.
        console.log(domEvent, this);
    }
}