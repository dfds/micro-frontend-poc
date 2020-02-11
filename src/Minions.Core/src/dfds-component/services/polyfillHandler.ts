import IPlugin from "../plugins/IPlugin";

type WcPolyfillsLoaded = Array<{ script: Element; hasLoaded: boolean }>;
declare global {
  interface Window {
      wcPolyfillsLoaded: WcPolyfillsLoaded;
  }
}

let didIncludeOnce = false;

const includePolyfills = async (
  options: { usesShadow: boolean },
  plugins: IPlugin[] | undefined,
) => {
  if (didIncludeOnce) {
    return;
  }

  const polyfillLoaderPlugin: any = plugins?.find((plugin) => plugin.name === "polyfill-loader");

  if (polyfillLoaderPlugin) {
    return includePolyfillsFromPlugin(polyfillLoaderPlugin);
  }

  const scriptsLists = [];

  if (options.usesShadow) {
    scriptsLists.push(loadScript("https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.1/bundles/webcomponents-sd.js"));
  }

  scriptsLists.push(loadScript("https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.1/bundles/webcomponents-ce.js'"));
  scriptsLists.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.1/custom-elements-es5-adapter.js"));

  try {
    await Promise.all(scriptsLists);
    didIncludeOnce = true;
  } catch (error) {
    console.error(error);
  }
};

let didIncludeOncePlugin = false;

const includePolyfillsFromPlugin = async (plugin: IPlugin) => {
  if (didIncludeOncePlugin) {
    return;
  }

  const scriptsLists = [];

  if (plugin.options?.use.sd) {
    const src: any =
      typeof plugin.options?.use.sd === "string"
        ? plugin.options?.use.sd
        : "https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.1/bundles/webcomponents-sd.js";

    scriptsLists.push(loadScript(src));
  }

  if (plugin.options?.use.ce) {
      const src: any =
      typeof plugin.options?.use.ce === "string"
        ? plugin.options?.use.ce
        : 'https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.1/bundles/webcomponents-ce.js';

    scriptsLists.push(loadScript(src));
  }

    const adapterSrc: any =
    typeof plugin.options?.use.adapter === "string"
      ? plugin.options.use.adapter
      : "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.1/custom-elements-es5-adapter.js";

  scriptsLists.push(loadScript(adapterSrc));

  try {
    await Promise.all(scriptsLists);
    didIncludeOncePlugin = true;
  } catch (error) {
    console.error(error);
  }
};

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;

    if (!window.wcPolyfillsLoaded) {
      window.wcPolyfillsLoaded = [];
    }

    const existingPolyfill = window.wcPolyfillsLoaded.find((loadedScript) =>
      loadedScript.script.isEqualNode(script),
    );

    if (existingPolyfill) {
      if (existingPolyfill.hasLoaded) {
        resolve();
      }

      existingPolyfill.script.addEventListener("load", () => resolve());
      return;
    }

    const scriptEntry = {
      script,
      hasLoaded: false,
    };

    window.wcPolyfillsLoaded.push(scriptEntry);

    script.addEventListener("load", () => {
      scriptEntry.hasLoaded = true;
      resolve();
    });

    script.addEventListener("error", () => reject("Polyfill failed to load"));

    document.head.appendChild(script);
  });
};

export default includePolyfills;
