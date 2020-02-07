import React, { FC, Component, ComponentClass } from "react";
import { StyleConfig } from "./StyleConfig";
import { StyleElement } from "./StyleElement";

const StyleRenderer = (styles: StyleConfig) => <P, S>(
    // ReSharper disable once InconsistentNaming => JSX expects it to be upper case.
    WrappedComponent: ComponentClass<P, S> | FC<P>,
) => {
    return class extends Component<P, S> {
        public render(): JSX.Element {
            return (
                <StyleElement styles={styles}>
                    <div>
                        <WrappedComponent {...(this.props as P)} />
                    </div>
                </StyleElement>
            );
        }
    };
};

export { StyleRenderer };