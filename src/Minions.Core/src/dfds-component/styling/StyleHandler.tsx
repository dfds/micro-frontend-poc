import { FC, CSSProperties } from "react";
import Style from "style-it";
import IStyleContainer from "./IStyleContainer";
import Styles from "./Styles";

// ReSharper disable once InconsistentNaming
const StyleHandler: FC<IStyleContainer> = (props: IStyleContainer): JSX.Element => {
    let styles: Styles;

    if (typeof props.styles === "string") {
        styles = (((props.styles) as any) as CSSProperties).toString();
    }
    else {
        styles = (props.styles as CSSProperties[]).reduce((acc: CSSProperties, current: CSSProperties) => ((`${acc} ${current}`) as any) as CSSProperties);
    }

    return Style.it(styles, props.children);
};

export default StyleHandler;