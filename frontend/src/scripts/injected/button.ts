import { InjectButtonRequest } from "@/types/scripts/base";
import { logoBase64 } from "@/constants/logoBase64";

const createButton = (onClick: () => Promise<void>) => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const container = document.createElement("div");
  container.id = "interview-rank-container";
  container.style.position = "fixed";
  container.style.top = "5px";
  container.style.right = "190px";
  container.style.zIndex = "10000";
  container.style.width = "40px";
  container.style.height = "40px";
  container.style.padding = "5px";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  container.style.cursor = "pointer";
  container.style.transition = "background-color 0.3s, transform 0.1s";

  const button = document.createElement("button");
  button.id = "interview-rank-button";
  button.style.backgroundColor = "transparent";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.cursor = "pointer";
  button.style.width = "100%";
  button.style.height = "100%";

  const img = document.createElement("img");
  img.src = `${logoBase64}`;
  img.alt = "Button icon";
  img.style.width = "30px";
  img.style.height = "30px";

  button.appendChild(img);
  container.appendChild(button);

  container.addEventListener("mouseover", () => {
    container.style.backgroundColor = isDarkMode ? "#808080" : "#000000";
  });

  container.addEventListener("mouseout", () => {
    container.style.backgroundColor = "transparent";
  });

  container.addEventListener("mousedown", () => {
    container.style.transform = "scale(0.95)";
  });

  container.addEventListener("mouseup", () => {
    container.style.transform = "scale(1)";
  });

  container.addEventListener("click", async () => {
    await onClick();
  });

  document.body.appendChild(container);
};

export async function injectButton({ injectedScript }: InjectButtonRequest) {
  await new Promise<void>((resolve) => {
    createButton(async () => {
      await injectedScript();
    });
    resolve();
  });
}
