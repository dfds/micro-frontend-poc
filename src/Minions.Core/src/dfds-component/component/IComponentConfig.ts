import IPlugin from "../interfaces/IPlugin"

interface IComponentConfig {
    name: string;
    useShadow: boolean;
    properties?: any;
    plugins?: IPlugin[];
}

export default IComponentConfig;