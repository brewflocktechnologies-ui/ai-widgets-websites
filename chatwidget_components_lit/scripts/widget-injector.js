import { mountChatWidget as r, exportFullStoreConfig as s, injectStoreConfig as c } from "./index.js";
const a = "zotly_active_token_session";
function d() {
  try {
    if (typeof sessionStorage < "u") {
      const t = sessionStorage.getItem(a);
      if (t)
        return JSON.parse(t);
    }
  } catch {
  }
  return null;
}
async function i(t, o = document.body) {
  if (!t || t === "storybook" || t === "active") {
    const e = d();
    if (e)
      return c(e), r(o);
  }
  if (typeof t == "string" && t !== "storybook" && t !== "active")
    try {
      const e = await fetch(t);
      if (e.ok) {
        const n = await e.json();
        c(n);
      } else
        console.warn(`ZotlyWidget: Failed to fetch JSON token from ${t}`);
    } catch (e) {
      console.error("ZotlyWidget: Error loading remote JSON token:", e);
    }
  else t && typeof t == "object" && c(t);
  return r(o);
}
window.ZotlyWidget = {
  inject: i,
  exportToken: s,
  mount: r
};
if (typeof document < "u") {
  const t = document.currentScript || document.querySelector("script[data-token-url]") || document.querySelector("script[data-token-json]");
  if (t) {
    const o = t.getAttribute("data-token-url"), e = t.getAttribute("data-token-json");
    if (o)
      i(o);
    else if (e)
      try {
        const n = JSON.parse(e);
        i(n);
      } catch (n) {
        console.error("ZotlyWidget: Failed to parse data-token-json attribute:", n), i();
      }
  }
}
export {
  d as getActiveStorybookToken,
  i as injectWidget
};
