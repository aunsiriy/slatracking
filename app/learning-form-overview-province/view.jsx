'use client';

import dynamic from 'next/dynamic';
import { dsReadyPromise } from '@/app/ds-ready.js';

// See app/learning-form-overview-admin/view.jsx for why this loads with
// ssr:false and awaits dsReadyPromise before importing view-inner.jsx.
const ViewInner = dynamic(() => dsReadyPromise.then(() => import('./view-inner.jsx')), { ssr: false });

export default function View() {
  return <ViewInner />;
}
