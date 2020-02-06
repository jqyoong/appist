import "@/registerServiceWorker";
import App from "@/components/App.svelte";

function replaceContents(node: HTMLElement | null): HTMLElement | null {
  if (node) node.innerHTML = "";

  return node;
}

export default new App({
  target: replaceContents(document.getElementById("app")) || new HTMLElement()
});
