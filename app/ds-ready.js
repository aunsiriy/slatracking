'use client';

// The design-system bundles (pea-ds-react.bundle.js, _ds_bundle.js) load with
// strategy="afterInteractive" so window.React is already bridged by the time
// they run (see react-globals-bridge.jsx). Route code must not read
// window.DesignSystem_cbd181 / window.PeaDsReact until BOTH scripts have
// actually finished loading over the network, since afterInteractive scripts
// are fetched asynchronously and can resolve after the route's own JS chunk.
// dsReadyPromise is the single shared gate every view.jsx awaits before
// importing its view-inner.jsx.

let resolveReady;
export const dsReadyPromise = new Promise((resolve) => {
  resolveReady = resolve;
});

let pendingScripts = 2;
export function notifyDsScriptLoaded() {
  pendingScripts -= 1;
  if (pendingScripts <= 0) resolveReady();
}
