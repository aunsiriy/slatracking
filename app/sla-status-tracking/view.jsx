'use client';

import dynamic from 'next/dynamic';
import { dsReadyPromise } from '@/app/ds-ready.js';

// The legacy component tree in view-inner.jsx (and everything it imports)
// reads browser globals like `window.DesignSystem_cbd181` and
// `window.ROLES` at module top-level. Next.js still executes Client
// Component modules once during server-side rendering to produce the
// initial HTML, which would crash with "window is not defined". Loading
// it with ssr:false skips that server pass entirely — matches the
// original Vite app anyway, which only ever rendered this content
// client-side into an empty #root div.
//
// The DS bundle scripts load with strategy="afterInteractive" (see
// react-globals-bridge.jsx), so they can still be mid-flight over the
// network after this module has already mounted client-side. Awaiting
// dsReadyPromise first guarantees window.DesignSystem_cbd181 is fully
// populated before view-inner.jsx's module-level destructure runs.
const ViewInner = dynamic(() => dsReadyPromise.then(() => import('./view-inner.jsx')), { ssr: false });

export default function View() {
  return <ViewInner />;
}
