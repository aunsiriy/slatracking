'use client';

import * as React from 'react';
import Script from 'next/script';
import { notifyDsScriptLoaded } from './ds-ready.js';

const DS_BASE = '/_ds/pea-design-system-newest-cbd18118-ffd4-4a23-9eb9-992de10a0e85';

// The design-system bundle in public/_ds is a precompiled, sourceless script
// (loaded via <script>, not an npm import) that reads `window.React` and calls
// its hooks directly. It must resolve to the exact same React module instance
// that Next.js uses to render/hydrate the page, otherwise its hooks find no
// active dispatcher. Exposing the npm React instance here (evaluated as soon
// as this client module loads, before the bundle's components ever render)
// keeps both sides on one React instance.
//
// `import * as React from 'react'` gives a frozen ES module namespace object.
// pea-ds-react.bundle.js's react-shim does `module.exports = window.React`
// and then assigns extra properties onto it (`.jsx`, `.jsxs`, `.jsxDEV`),
// which throws "Cannot add property jsx, object is not extensible" against a
// frozen namespace object. Spreading into a plain object keeps every export
// as the exact same function reference (so hooks still share React's
// internal dispatcher) while making the container itself mutable.
if (typeof window !== 'undefined') {
  window.React = { ...React };
}

// pea-ds-react.bundle.js reads window.React eagerly, at the top level of its
// IIFE, while constructing every component it exports (not lazily on first
// render). That means it MUST run after window.React above has already been
// set. A strategy="beforeInteractive" <Script> runs before any Next.js code
// at all — including the code on this line that sets window.React — so
// pea-ds-react.bundle.js would see window.React as undefined, throw while
// building its components, and never reach the `window.PeaDsReact = ...`
// assignment at the end of the file. That is the actual cause of "Cannot read
// properties of undefined (reading 'Button')": window.PeaDsReact itself was
// never created. strategy="afterInteractive" defers these scripts until
// after hydration (so window.React is guaranteed to be set already); routes
// then wait on dsReadyPromise (see ds-ready.js) before importing their
// view-inner.jsx, so they never read window.DesignSystem_cbd181 too early.
export default function ReactGlobalsBridge() {
  return (
    <>
      <Script src={`${DS_BASE}/pea-ds-react.bundle.js`} strategy="afterInteractive" onReady={notifyDsScriptLoaded} />
      <Script src={`${DS_BASE}/_ds_bundle.js`} strategy="afterInteractive" onReady={notifyDsScriptLoaded} />
    </>
  );
}
