// Utility functions

export function getPodLinkClass (inputText, elementWidth) {
  let text = document.createElement("span");
  document.body.appendChild(text);
  text.style.font = "roboto";
  text.style.fontSize = "20px";
  text.style.fontWeight = 500;
  text.style.height = "auto";
  text.style.width = "auto";
  text.style.position = "absolute";
  text.style.whiteSpace = "no-wrap";
  text.innerHTML = inputText;
  let width = Math.ceil(text.clientWidth);
  document.body.removeChild(text);
  return width > elementWidth
    ? "stretched-link pod-link-with-overflow"
    : "stretched-link";
};
