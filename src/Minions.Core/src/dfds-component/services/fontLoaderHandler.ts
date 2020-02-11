import WebFont from "webfontloader";
import IPlugin from "../plugins/IPlugin";

const loadFonts = (plugins: IPlugin[] | undefined) => {
  const fontLoaderPlugin = plugins?.find((plugin) => plugin.name === "font-loader");

  if (fontLoaderPlugin?.options) {
    WebFont.load(fontLoaderPlugin.options);
  }
}

export default loadFonts;
