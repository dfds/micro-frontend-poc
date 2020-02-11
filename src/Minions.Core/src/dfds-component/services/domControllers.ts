export const injectIntoShadowRoot = (webComponent: HTMLElement, element: Element): void => {
    const elementToPrepend: Element | ShadowRoot = webComponent.shadowRoot || webComponent;

    if (existsIdenticalElement(element, elementToPrepend)) {
        return;
    }

    elementToPrepend.prepend(element);
};

export const injectIntoHead = (element: Element) => {
    if (existsIdenticalElement(element, document.head)) {
        return;
    }

    document.head.append(element);
};

export const stripStyleFromHead = () => {
    const allChildren = document.head.children;
    const style = Array.from(allChildren).find((child) => child.id === "dfds-style");

    if (style) {
        document.head.removeChild(style);
    }
};

export const existsIdenticalElement = (element: Element, host: Element | ShadowRoot): boolean => {
    const allChildren = Array.from(host.children);
    const exists = allChildren.some((child: Element) => element.isEqualNode(child) as any);
    return exists;
};
