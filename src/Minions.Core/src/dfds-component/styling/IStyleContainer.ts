import { ReactNode } from "react";
import Styles from "./Styles";

interface IStyleContainer {
    styles: Styles;
    children: ReactNode | ReactNode[];
}

export default IStyleContainer;