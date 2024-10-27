import { logoBase64 } from "@/constants/logoBase64";

export default async function createButton() {
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

  container.addEventListener("click", () => {
    const challengeName: string | null = extractChallengeName(
      window.location.href,
    );
    if (!challengeName) {
      console.error("Challenge name cant be found");
      return;
    }

    const editorContent: string | null = extractEditorContent();
    if (!editorContent) {
      console.error("Editor content cant be found");
      return;
    }
    console.log(challengeName, editorContent);
  });

  document.body.appendChild(container);
}

function extractChallengeName(url: string): string | null {
  const regex = /challenges\/([^/]+)\/problem/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

function extractEditorContent(): string | null {
  const editorContainer = document.querySelector(".monaco-mouse-cursor-text");
  if (!editorContainer) {
    console.error("Editor container not found");
    return null;
  }
  const divs = editorContainer.querySelectorAll("div");
  const contentArray = Array.from(divs).map((div) => div.textContent || "");
  const formattedContent = contentArray.join("\n");
  return formattedContent;
}

/**
 * All the important information are found in the divs with className hackdown-content. More specific classes are:
 *
 * challenge_problem_statement
 * challenge_input_format_body
 * challenge_constraints
 * challenge_output_format
 * challenge_sample_input
 * challenge_sample_output
 * challenge_explanation_body
 *
 * However, some information is hidden behind svgs and glyphs which are difficult to access. An alternative is screenshot or simply relying on the knowledge of the LLMS.
 */
//
