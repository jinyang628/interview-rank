import { injectCustomScript } from "@/utils/inject";
export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  main: async () => {
    if ((window as any).__contentScriptInjected) return;
    (window as any).__contentScriptInjected = true;

    await injectCustomScript("/injected.js", { keepInDom: true });
  },
});
