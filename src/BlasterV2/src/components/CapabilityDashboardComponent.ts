import WebComponent from "minions-core/lib/components/WebComponent";
import { html, property, customElement, TemplateResult } from "lit-element";
import KafkaEventBridgePlugin from "minions-plugins-kafka/lib/KafkaEventBridgePlugin";
import KafkaEventBridgePluginLoader from "minions-plugins-kafka/lib/KafkaEventBridgePluginLoader";
// @ts-ignore
import CSS from '../../style/CapabilityDashboardComponent-css.js';

const axios = require('axios').default;

const componentIdentifier = "dfds-devex-capabilitydashboard-component";

const devToken = '';

@customElement(componentIdentifier)
export default class CapabilityDashboardComponent extends WebComponent {
    @property({type: Array}) capabilities = [];
    @property({type: Boolean}) enabled = false;
    @property({type: String}) currentUser = "";

    constructor() {
        super({
                identifier: componentIdentifier,
                plugins: [new KafkaEventBridgePlugin({
                    signalREndpoint: "http://localhost:50900/events/signalr-hub",
                    domEventMap: [componentIdentifier]
                })]
            },
            [new KafkaEventBridgePluginLoader()]);

        this.dispatchEvent(new CustomEvent(this.identifier as string, {
            bubbles: false,
            composed: true,
            detail: (event: any) => {
                console.log("Subscriber callback event!", event);
                this.interact(event);
            }
        }));
    }

    isMember(cap : Capability) : Boolean {
        let result = cap.Members.find(mem => mem.Email.valueOf() === this.currentUser.valueOf());
        return result !== undefined;
    }

    hasContexts(cap : Capability) : Boolean {
        return cap.Contexts.length >= 1;
    }

    render(): TemplateResult {
        return html`
        ${CSS}
        <script src="https://kit.fontawesome.com/a466903c6d.js" crossorigin="anonymous"></script>
        <div class="capabilityList">
            <h1 @click=${this.interact}>${this.enabled}</h1>
            <h1>${this.currentUser}</h1>

            <table class="table is-fullwidth is-hoverable" v-if="hasCapabilities">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Joined</th>
                    <th>Service indicators</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                ${(this.capabilities as Array<Capability>).map(cap => html`
                <tr>
                    <td>${cap.Name}</td>
                    <td>${this.isMember(cap) ? html`<span class="tag is-primary">Joined</span>` : html``}</td>
                    <td>
                        <svg width="15" viewBox="0 0 256 416" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M201.816 230.216c-16.186 0-30.697 7.171-40.634 18.461l-25.463-18.026c2.703-7.442 4.255-15.433 4.255-23.797 0-8.219-1.498-16.076-4.112-23.408l25.406-17.835c9.936 11.233 24.409 18.365 40.548 18.365 29.875 0 54.184-24.305 54.184-54.184 0-29.879-24.309-54.184-54.184-54.184-29.875 0-54.184 24.305-54.184 54.184 0 5.348.808 10.505 2.258 15.389l-25.423 17.844c-10.62-13.175-25.911-22.374-43.333-25.182v-30.64c24.544-5.155 43.037-26.962 43.037-53.019C124.171 24.305 99.862 0 69.987 0 40.112 0 15.803 24.305 15.803 54.184c0 25.708 18.014 47.246 42.067 52.769v31.038C25.044 143.753 0 172.401 0 206.854c0 34.621 25.292 63.374 58.355 68.94v32.774c-24.299 5.341-42.552 27.011-42.552 52.894 0 29.879 24.309 54.184 54.184 54.184 29.875 0 54.184-24.305 54.184-54.184 0-25.883-18.253-47.553-42.552-52.894v-32.775a69.965 69.965 0 0 0 42.6-24.776l25.633 18.143c-1.423 4.84-2.22 9.946-2.22 15.24 0 29.879 24.309 54.184 54.184 54.184 29.875 0 54.184-24.305 54.184-54.184 0-29.879-24.309-54.184-54.184-54.184zm0-126.695c14.487 0 26.27 11.788 26.27 26.271s-11.783 26.27-26.27 26.27-26.27-11.787-26.27-26.27c0-14.483 11.783-26.271 26.27-26.271zm-158.1-49.337c0-14.483 11.784-26.27 26.271-26.27s26.27 11.787 26.27 26.27c0 14.483-11.783 26.27-26.27 26.27s-26.271-11.787-26.271-26.27zm52.541 307.278c0 14.483-11.783 26.27-26.27 26.27s-26.271-11.787-26.271-26.27c0-14.483 11.784-26.27 26.271-26.27s26.27 11.787 26.27 26.27zm-26.272-117.97c-20.205 0-36.642-16.434-36.642-36.638 0-20.205 16.437-36.642 36.642-36.642 20.204 0 36.641 16.437 36.641 36.642 0 20.204-16.437 36.638-36.641 36.638zm131.831 67.179c-14.487 0-26.27-11.788-26.27-26.271s11.783-26.27 26.27-26.27 26.27 11.787 26.27 26.27c0 14.483-11.783 26.271-26.27 26.271z"/></svg>
                        <svg width="30" style="${!this.hasContexts(cap) ? 'filter: opacity(40%);' : ''}"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 304 182" style="enable-background:new 0 0 304 182;" xml:space="preserve"> <style type="text/css"> .st0{fill:#252F3E;}.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FF9900;}</style> <g> <path class="st0" d="M86.4,66.4c0,3.7,0.4,6.7,1.1,8.9c0.8,2.2,1.8,4.6,3.2,7.2c0.5,0.8,0.7,1.6,0.7,2.3c0,1-0.6,2-1.9,3l-6.3,4.2 c-0.9,0.6-1.8,0.9-2.6,0.9c-1,0-2-0.5-3-1.4C76.2,90,75,88.4,74,86.8c-1-1.7-2-3.6-3.1-5.9c-7.8,9.2-17.6,13.8-29.4,13.8 c-8.4,0-15.1-2.4-20-7.2c-4.9-4.8-7.4-11.2-7.4-19.2c0-8.5,3-15.4,9.1-20.6c6.1-5.2,14.2-7.8,24.5-7.8c3.4,0,6.9,0.3,10.6,0.8 c3.7,0.5,7.5,1.3,11.5,2.2v-7.3c0-7.6-1.6-12.9-4.7-16c-3.2-3.1-8.6-4.6-16.3-4.6c-3.5,0-7.1,0.4-10.8,1.3c-3.7,0.9-7.3,2-10.8,3.4 c-1.6,0.7-2.8,1.1-3.5,1.3c-0.7,0.2-1.2,0.3-1.6,0.3c-1.4,0-2.1-1-2.1-3.1v-4.9c0-1.6,0.2-2.8,0.7-3.5c0.5-0.7,1.4-1.4,2.8-2.1 c3.5-1.8,7.7-3.3,12.6-4.5c4.9-1.3,10.1-1.9,15.6-1.9c11.9,0,20.6,2.7,26.2,8.1c5.5,5.4,8.3,13.6,8.3,24.6V66.4z M45.8,81.6 c3.3,0,6.7-0.6,10.3-1.8c3.6-1.2,6.8-3.4,9.5-6.4c1.6-1.9,2.8-4,3.4-6.4c0.6-2.4,1-5.3,1-8.7v-4.2c-2.9-0.7-6-1.3-9.2-1.7 c-3.2-0.4-6.3-0.6-9.4-0.6c-6.7,0-11.6,1.3-14.9,4c-3.3,2.7-4.9,6.5-4.9,11.5c0,4.7,1.2,8.2,3.7,10.6 C37.7,80.4,41.2,81.6,45.8,81.6z M126.1,92.4c-1.8,0-3-0.3-3.8-1c-0.8-0.6-1.5-2-2.1-3.9L96.7,10.2c-0.6-2-0.9-3.3-0.9-4 c0-1.6,0.8-2.5,2.4-2.5h9.8c1.9,0,3.2,0.3,3.9,1c0.8,0.6,1.4,2,2,3.9l16.8,66.2l15.6-66.2c0.5-2,1.1-3.3,1.9-3.9c0.8-0.6,2.2-1,4-1 h8c1.9,0,3.2,0.3,4,1c0.8,0.6,1.5,2,1.9,3.9l15.8,67l17.3-67c0.6-2,1.3-3.3,2-3.9c0.8-0.6,2.1-1,3.9-1h9.3c1.6,0,2.5,0.8,2.5,2.5 c0,0.5-0.1,1-0.2,1.6c-0.1,0.6-0.3,1.4-0.7,2.5l-24.1,77.3c-0.6,2-1.3,3.3-2.1,3.9c-0.8,0.6-2.1,1-3.8,1h-8.6c-1.9,0-3.2-0.3-4-1 c-0.8-0.7-1.5-2-1.9-4L156,23l-15.4,64.4c-0.5,2-1.1,3.3-1.9,4c-0.8,0.7-2.2,1-4,1H126.1z M254.6,95.1c-5.2,0-10.4-0.6-15.4-1.8 c-5-1.2-8.9-2.5-11.5-4c-1.6-0.9-2.7-1.9-3.1-2.8c-0.4-0.9-0.6-1.9-0.6-2.8v-5.1c0-2.1,0.8-3.1,2.3-3.1c0.6,0,1.2,0.1,1.8,0.3 c0.6,0.2,1.5,0.6,2.5,1c3.4,1.5,7.1,2.7,11,3.5c4,0.8,7.9,1.2,11.9,1.2c6.3,0,11.2-1.1,14.6-3.3c3.4-2.2,5.2-5.4,5.2-9.5 c0-2.8-0.9-5.1-2.7-7c-1.8-1.9-5.2-3.6-10.1-5.2L246,52c-7.3-2.3-12.7-5.7-16-10.2c-3.3-4.4-5-9.3-5-14.5c0-4.2,0.9-7.9,2.7-11.1 c1.8-3.2,4.2-6,7.2-8.2c3-2.3,6.4-4,10.4-5.2c4-1.2,8.2-1.7,12.6-1.7c2.2,0,4.5,0.1,6.7,0.4c2.3,0.3,4.4,0.7,6.5,1.1 c2,0.5,3.9,1,5.7,1.6c1.8,0.6,3.2,1.2,4.2,1.8c1.4,0.8,2.4,1.6,3,2.5c0.6,0.8,0.9,1.9,0.9,3.3v4.7c0,2.1-0.8,3.2-2.3,3.2 c-0.8,0-2.1-0.4-3.8-1.2c-5.7-2.6-12.1-3.9-19.2-3.9c-5.7,0-10.2,0.9-13.3,2.8c-3.1,1.9-4.7,4.8-4.7,8.9c0,2.8,1,5.2,3,7.1 c2,1.9,5.7,3.8,11,5.5l14.2,4.5c7.2,2.3,12.4,5.5,15.5,9.6c3.1,4.1,4.6,8.8,4.6,14c0,4.3-0.9,8.2-2.6,11.6 c-1.8,3.4-4.2,6.4-7.3,8.8c-3.1,2.5-6.8,4.3-11.1,5.6C264.4,94.4,259.7,95.1,254.6,95.1z"/> <g> <path class="st1" d="M273.5,143.7c-32.9,24.3-80.7,37.2-121.8,37.2c-57.6,0-109.5-21.3-148.7-56.7c-3.1-2.8-0.3-6.6,3.4-4.4 c42.4,24.6,94.7,39.5,148.8,39.5c36.5,0,76.6-7.6,113.5-23.2C274.2,133.6,278.9,139.7,273.5,143.7z"/> <path class="st1" d="M287.2,128.1c-4.2-5.4-27.8-2.6-38.5-1.3c-3.2,0.4-3.7-2.4-0.8-4.5c18.8-13.2,49.7-9.4,53.3-5 c3.6,4.5-1,35.4-18.6,50.2c-2.7,2.3-5.3,1.1-4.1-1.9C282.5,155.7,291.4,133.4,287.2,128.1z"/> </g> </g> </svg> 
                        <svg width="25" style="${!this.hasContexts(cap) ? 'filter: opacity(40%);' : ''}"  version="1.1" viewBox="0 0 722.85 701.97" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"> <metadata> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/> <dc:title/> </cc:Work> </rdf:RDF> </metadata> <g transform="translate(-6.3261 -174.75)"> <g> <path d="m365.31 184.81a46.725 46.342 0 0 0-17.906 4.5312l-244.34 116.75a46.725 46.342 0 0 0-25.281 31.438l-60.281 262.25a46.725 46.342 0 0 0 6.3438 35.531 46.725 46.342 0 0 0 2.6562 3.6875l169.12 210.28a46.725 46.342 0 0 0 36.531 17.438l271.22-0.0625a46.725 46.342 0 0 0 36.531-17.406l169.06-210.31a46.725 46.342 0 0 0 9.0312-39.219l-60.375-262.25a46.725 46.342 0 0 0-25.281-31.438l-244.38-116.69a46.725 46.342 0 0 0-22.656-4.5312z" fill="#326ce5" stroke-width="0"/> <path d="m367.73 274.06c-8.077 8.2e-4 -14.626 7.2759-14.625 16.25 1e-5 0.13773 0.0282 0.26934 0.0312 0.40625-0.0119 1.2194-0.0708 2.6884-0.0312 3.75 0.19262 5.176 1.3209 9.1375 2 13.906 1.2303 10.207 2.2612 18.667 1.625 26.531-0.61869 2.9654-2.8029 5.6774-4.75 7.5625l-0.34375 6.1875c-8.7768 0.72717-17.612 2.0587-26.438 4.0625-37.975 8.6222-70.67 28.183-95.562 54.594-1.6152-1.1019-4.441-3.1291-5.2813-3.75-2.6112 0.35262-5.2502 1.1583-8.6875-0.84375-6.5449-4.4056-12.506-10.487-19.719-17.812-3.305-3.5042-5.6983-6.841-9.625-10.219-0.89172-0.76707-2.2526-1.8046-3.25-2.5938-3.0699-2.4476-6.6907-3.724-10.188-3.8438-4.4959-0.15394-8.8239 1.6038-11.656 5.1562-5.0352 6.3154-3.4231 15.968 3.5938 21.562 0.0712 0.0567 0.14702 0.10078 0.21875 0.15625 0.96422 0.78162 2.145 1.7831 3.0312 2.4375 4.1669 3.0766 7.9732 4.6514 12.125 7.0938 8.747 5.4018 15.998 9.8809 21.75 15.281 2.246 2.3942 2.6386 6.6129 2.9375 8.4375l4.6875 4.1875c-25.093 37.764-36.707 84.409-29.844 131.94l-6.125 1.7812c-1.6143 2.0846-3.8954 5.3647-6.2813 6.3438-7.5251 2.3702-15.994 3.2406-26.219 4.3125-4.8003 0.39915-8.9422 0.16095-14.031 1.125-1.1201 0.21218-2.6807 0.61877-3.9062 0.90625-0.0426 9e-3 -0.0824 0.0216-0.125 0.0312-0.0668 0.0155-0.15456 0.0479-0.21875 0.0625-8.6201 2.0828-14.158 10.006-12.375 17.812 1.7832 7.8083 10.203 12.557 18.875 10.688 0.0626-0.0143 0.1535-0.0167 0.21875-0.0312 0.0979-0.0224 0.18409-0.0699 0.28125-0.0937 1.2088-0.26536 2.7238-0.5606 3.7812-0.84375 5.0033-1.3396 8.6269-3.308 13.125-5.0312 9.6769-3.4708 17.692-6.3702 25.5-7.5 3.2612-0.25542 6.6971 2.0122 8.4062 2.9688l6.375-1.0938c14.67 45.483 45.414 82.245 84.344 105.31l-2.6562 6.375c0.95742 2.4754 2.0134 5.8247 1.3002 8.2693-2.8387 7.3612-7.701 15.131-13.238 23.793-2.6808 4.0019-5.4245 7.1076-7.8438 11.688-0.5789 1.0959-1.3162 2.7793-1.875 3.9375-3.7588 8.0424-1.0016 17.305 6.2188 20.781 7.2658 3.4979 16.284-0.19134 20.188-8.25 6e-3 -0.0114 0.0257-0.0198 0.0312-0.0312 4e-3 -9e-3 -4e-3 -0.0225 0-0.0312 0.55593-1.1426 1.3435-2.6444 1.8125-3.7188 2.0721-4.747 2.7616-8.8151 4.2188-13.406 3.8696-9.7201 5.9957-19.919 11.323-26.274 1.4587-1.7402 3.8368-2.4095 6.3024-3.0696l3.3125-6c33.938 13.027 71.927 16.522 109.88 7.9062 8.657-1.9656 17.014-4.5094 25.094-7.5625 0.93098 1.6513 2.6611 4.8257 3.125 5.625 2.5056 0.81518 5.2404 1.2361 7.4688 4.5312 3.9854 6.809 6.7109 14.864 10.031 24.594 1.4574 4.5911 2.1776 8.6593 4.25 13.406 0.47234 1.082 1.256 2.6049 1.8125 3.75 3.8948 8.0848 12.942 11.787 20.219 8.2812 7.2195-3.4779 9.9797-12.74 6.2188-20.781-0.55889-1.1581-1.3273-2.8416-1.9062-3.9375-2.4195-4.5798-5.1627-7.6545-7.8438-11.656-5.5372-8.6619-10.13-15.858-12.969-23.219-1.1871-3.7966 0.20028-6.1577 1.125-8.625-0.55378-0.63477-1.7388-4.2201-2.4375-5.9062 40.457-23.888 70.299-62.021 84.312-106.06 1.8924 0.29742 5.1815 0.87936 6.25 1.0938 2.1995-1.4507 4.2219-3.3435 8.1875-3.0312 7.8083 1.1294 15.823 4.0297 25.5 7.5 4.4982 1.7231 8.1216 3.7231 13.125 5.0625 1.0575 0.28309 2.5724 0.5472 3.7812 0.8125 0.0972 0.0238 0.1833 0.0714 0.28125 0.0937 0.0653 0.0146 0.15615 0.0169 0.21875 0.0312 8.6724 1.867 17.094-2.8787 18.875-10.688 1.7807-7.807-3.7543-15.732-12.375-17.812-1.2539-0.28513-3.0322-0.76938-4.25-1-5.0891-0.96378-9.2309-0.7261-14.031-1.125-10.225-1.0714-18.694-1.9427-26.219-4.3125-3.0683-1.1903-5.251-4.8412-6.3126-6.3438l-5.9062-1.7188c3.0623-22.154 2.2366-45.211-3.0625-68.281-5.3484-23.285-14.8-44.581-27.406-63.344 1.515-1.3773 4.3762-3.9109 5.1875-4.6562 0.23716-2.6242 0.0334-5.3755 2.75-8.2812 5.7513-5.4007 13.003-9.879 21.75-15.281 4.1517-2.4425 7.9895-4.017 12.156-7.0938 0.94225-0.69576 2.2289-1.7976 3.2188-2.5938 7.0154-5.5963 8.6306-15.248 3.5938-21.562s-14.797-6.9088-21.812-1.3125c-0.99856 0.79085-2.3535 1.8225-3.25 2.5938-3.9265 3.378-6.3514 6.7144-9.6562 10.219-7.2125 7.326-13.174 13.438-19.719 17.844-2.836 1.6511-6.99 1.0798-8.875 0.96875l-5.5625 3.9688c-31.719-33.261-74.905-54.525-121.41-58.656-0.13006-1.9487-0.30045-5.4712-0.34375-6.5312-1.9037-1.8216-4.2034-3.3769-4.7812-7.3125-0.63617-7.8639 0.42597-16.325 1.6562-26.531 0.6791-4.7688 1.8074-8.7302 2-13.906 0.0438-1.1766-0.0265-2.884-0.0312-4.1562-9.6e-4 -8.9741-6.548-16.251-14.625-16.25zm-18.312 113.44-4.3438 76.719-0.3125 0.15625c-0.29134 6.8634-5.94 12.344-12.875 12.344-2.8408 0-5.4629-0.91229-7.5938-2.4688l-0.125 0.0625-62.906-44.594c19.334-19.011 44.063-33.06 72.562-39.531 5.206-1.182 10.41-2.0591 15.594-2.6875zm36.656 0c33.273 4.0923 64.045 19.159 87.625 42.25l-62.5 44.312-0.21875-0.0937c-5.5474 4.0517-13.363 3.0464-17.688-2.375-1.7713-2.221-2.7007-4.8324-2.8125-7.4688l-0.0625-0.0312zm-147.62 70.875 57.438 51.375-0.0625 0.3125c5.1844 4.507 5.9489 12.328 1.625 17.75-1.7712 2.221-4.1421 3.7107-6.6875 4.4062l-0.0625 0.25-73.625 21.25c-3.7473-34.265 4.3286-67.574 21.375-95.344zm258.16 0.0312c8.5341 13.833 14.997 29.282 18.844 46.031 3.8011 16.548 4.755 33.067 3.1875 49.031l-74-21.312-0.0625-0.3125c-6.6265-1.811-10.699-8.5516-9.1562-15.312 0.63203-2.7696 2.1022-5.1126 4.0938-6.8438l-0.0312-0.15625 57.125-51.125zm-140.66 55.312h23.531l14.625 18.281-5.25 22.812-21.125 10.156-21.188-10.188-5.25-22.812zm75.438 62.562c0.99997-0.0505 1.9956 0.0396 2.9688 0.21875l0.125-0.15625 76.156 12.875c-11.146 31.313-32.473 58.44-60.969 76.594l-29.562-71.406 0.0937-0.125c-2.7156-6.31 2e-3 -13.71 6.25-16.719 1.5996-0.77041 3.2709-1.197 4.9375-1.2812zm-127.91 0.3125c5.8117 0.0815 11.025 4.1152 12.375 10.031 0.63219 2.7696 0.3245 5.5138-0.71875 7.9375l0.21875 0.28125-29.25 70.688c-27.347-17.549-49.129-43.824-60.781-76.062l75.5-12.812 0.125 0.15625c0.84451-0.15541 1.701-0.2304 2.5312-0.21875zm63.781 30.969c2.0244-0.0744 4.0786 0.34098 6.0312 1.2812 2.5595 1.2325 4.5367 3.1732 5.7812 5.5h0.28125l37.219 67.25c-4.8303 1.6192-9.7961 3.0031-14.875 4.1562-28.465 6.4629-56.839 4.5047-82.531-4.25l37.125-67.125h0.0625c2.2277-4.1644 6.4525-6.6489 10.906-6.8125z" color="#000000" fill="#fff" stroke="#fff" stroke-width=".25" style="block-progression:tb;text-indent:0;text-transform:none"/> </g> </g> </svg>
                    </td>
                    <td>
                        Ready
                    </td>                    
                </tr>
                `)}
            </tbody>
        </table>

        </div>
        `;
    }

    shouldUpdate(changedProperties : any) : boolean {
        console.log("shouldUpdate:", changedProperties);
        return true;
    }

    firstUpdated(_propertyValues : any): void {
        axios({
            url: '/api/capsvc/capabilities',
            method: 'get',
            headers: {'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + devToken}
        })
        .then((resp : any) => {
            console.log(resp);
            if (resp.status === 200) {
                let oldCap = this.capabilities.slice();
                this.capabilities = resp.data.items.map((cap : any) => {
                    let capability = new Capability();
                    capability.Name = cap.name;
                    capability.RootId = cap.rootId;
                    capability.Id = cap.id;
                    capability.Description = cap.description;

                    capability.Contexts = cap.contexts.map((con : any) => {
                        return Context.FromJson(con);
                    });

                    capability.Members = cap.members.map((mem : any) => {
                        let member = new Member();
                        member.Email = mem.email;
                        return member;
                    });

                    return capability;
                })
                this.requestUpdate('capabilities', oldCap).then(() => console.log("Update completed"));
            } else {
                console.log(resp);
                console.log("ERR, DIDN'T GET SUCCESS RESPONSE FOR CAPABILITIES");
            }
        });
    }

    interact(event : any): void {
        if (event.eventType) {
            switch (event.eventType.valueOf()) {
                case "capability_created".valueOf():
                    console.log("Capability created!");
                    let oldCap = this.capabilities.slice();
                    
                    let capability = new Capability();
                    capability.Name = event.payload.name;
                    capability.RootId = event.payload.rootId;
                    capability.Id = event.payload.id;
                    capability.Description = event.payload.description;

                    capability.Contexts = event.payload.contexts.map((con : any) => {
                        return Context.FromJson(con);
                    });

                    capability.Members = event.payload.members.map((mem : any) => {
                        let member = new Member();
                        member.Email = mem.email;
                        return member;
                    });

                    (this.capabilities as Array<Capability>).push(capability);
                    this.requestUpdate('capabilities', oldCap).then(() => console.log("Update completed"));
                    break;
                default:
                    console.log("Unsupported eventType")
                    break;
            }
        } else {
            console.log("Unable to recognise event format")
        }
    }
}

class Capability {
    Name : string;
    RootId : string;
    Id : string;
    Description : string;
    Members : Member[];
    Contexts : IContext[];

    constructor() {
        this.Name = "";
        this.RootId = "";
        this.Id = "";
        this.Description = "";
        this.Members = [];
        this.Contexts = [];
    }
}

class Member {
    Email : string;

    constructor() {
        this.Email = "";
    }
}

interface IContext {
    GetId() : string;
    GetName() : string;
    GetType() : ContextType;

    Into<T>() : T;
    ToJson() : String; // Will return all data attached to this object into json
}

class Context implements IContext {
    Id : string;
    Name : string;

    constructor() {
        this.Id = "";
        this.Name = "";
    }
    GetId(): string {
        return this.Id;
    }

    GetName(): string {
        return this.Name;
    }

    GetType(): ContextType {
        return ContextType.Base;
    }

    Into<T>(): T {
        return ((this as any) as T);
    }

    ToJson() : String {
        return JSON.stringify(this);
    }

    static FromJson(value : any) : IContext {
        if (value.awsRoleEmail) {
            let context = new AWSContext();
            context.Id = value.id;
            context.Name = value.name;
            context.AwsAccountId = value.awsAccountId;
            context.AwsRoleArn = value.awsRoleArn;
            context.AwsRoleEmail = value.awsRoleEmail;
            return context;
        }
        

        let context = new Context();
        context.Id = value.id;
        context.Name = value.name;
        return context;
    }
}

enum ContextType {
    Base,
    AWS
}

// @ts-ignore
class AWSContext extends Context {
    AwsAccountId : string;
    AwsRoleArn : string;
    AwsRoleEmail : string;

    constructor() {
        super();
        this.AwsAccountId = "";
        this.AwsRoleArn = "";
        this.AwsRoleEmail = "";
    }

    GetType(): ContextType {
        return ContextType.AWS;
    }

}