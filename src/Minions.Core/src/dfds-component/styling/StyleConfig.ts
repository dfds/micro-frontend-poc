import { ReactNode, CSSProperties } from "react";

type StyleConfig = string | string[] | CSSProperties | CSSProperties[];

interface IStyleConfig {
    styles: StyleConfig;
    children: ReactNode | ReactNode[];
}

export { StyleConfig, IStyleConfig };