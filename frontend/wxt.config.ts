import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    default_locale: "en",
    description:
      "Inject human-like interactions into your hackerrank interview practices.",
    name: "InterviewRank",
    version: "0.0.3",
    permissions: [
      "tabs",
      "activeTab",
      "background",
      "webNavigation",
      "storage",
    ],
    background: {
      service_worker: "background.js",
      persistent: true,
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["/content-scripts/content.js"],
      },
    ],
    web_accessible_resources: [
      {
        resources: [
          "icon/*.png",
          "images/*.svg",
          "images/*.png",
          "injected.js",
        ],
        matches: ["*://*/*"],
      },
    ],
    host_permissions: ["http://localhost:3000/*"],
  },
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  srcDir: "src",
});
