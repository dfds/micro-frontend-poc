import React, { FC, CSSProperties } from "react";
import Style from "style-it";
import { IStyleConfig } from "./StyleConfig";

// ReSharper disable once InconsistentNaming => JSX expects it to be upper case.
export const StyleElement: FC<IStyleConfig> = (props: any): JSX.Element => {
    let styles:any;

    if (typeof props.styles === "string") {
        styles = (props.styles as CSSProperties).toString();
    } else {
        styles = (props.styles as CSSProperties[]).reduce(
            (acc: CSSProperties, current: CSSProperties) => `${acc} ${current}` as CSSProperties,
        );
    }

    return Style.it(styles, props.children);
};