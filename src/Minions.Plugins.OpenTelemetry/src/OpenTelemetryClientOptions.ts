import { XMLHttpRequestPluginConfig } from "@opentelemetry/plugin-xml-http-request";
import { ScopeManager } from "@opentelemetry/scope-base";

export default class OpenTelemetryClientOptions implements XMLHttpRequestPluginConfig {
    openTelemetryEndpoint: string = "";
    clearTimingResources?: boolean;
    propagateTraceHeaderCorsUrls?: any;
    defaultScopeManager?: ScopeManager;
}