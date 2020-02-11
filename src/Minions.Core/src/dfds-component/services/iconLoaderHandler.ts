import IPlugin from "../plugins/IPlugin";
import { injectIntoShadowRoot } from "./domControllers";

const includeGoogleIcons = (element: HTMLElement, plugins: IPlugin[] | undefined) => {
  const iconLoaderPlugin: any = plugins?.find((plugin) => plugin.name === "icon-loader");

  if (iconLoaderPlugin?.options?.packs.includes("material-icons")) {
    setTimeout(() => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";

      injectIntoShadowRoot(element, link);
    });
  }
};

export default includeGoogleIcons;
