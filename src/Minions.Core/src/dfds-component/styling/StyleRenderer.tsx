import React, { FC, Component, ComponentClass } from "react";
import Styles from "./Styles";
import StyleHandler from "./StyleHandler";

// ReSharper disable once InconsistentNaming
const StyleRenderer = (styles: Styles) => <P, S>(
    // ReSharper disable once InconsistentNaming
    WrappedComponent: ComponentClass<P, S> | FC<P>,
) => {
    return class extends Component<P, S> {
        public render(): JSX.Element {
            return (
                <StyleHandler styles={styles}>
                    <div>
                        <WrappedComponent {...(this.props as P)} />
                    </div>
                </StyleHandler>
            );
        }
    };
};

export default StyleRenderer;