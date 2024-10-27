import { injectButton } from "@/scripts/injected/button";
import { injectButtonRequestSchema } from "@/types/scripts/injected/button";

const HACKERRANK_BASE_URL = "https://www.hackerrank.com/challenges";
const TESTING_URL = "https://www.google.com";

export default defineUnlistedScript(async () => {
  let baseUrl = "";

  switch (true) {
    case window.location.href.includes(HACKERRANK_BASE_URL):
      baseUrl = HACKERRANK_BASE_URL;
      break;
    case window.location.href.includes(TESTING_URL): // Testing URL
      baseUrl = TESTING_URL;
      break;
    default:
      return;
  }

  const injectButtonRequest = injectButtonRequestSchema.parse({
    injectedScript: async () => {
      console.log("Injected script");
    },
  });
  await injectButton(injectButtonRequest);
});
