import IPlugin from "../plugins/IPlugin"

interface IComponentConfig {
    name: string;
    useShadow: boolean;
    properties?: any;
    plugins?: IPlugin[];
}

export default IComponentConfig;