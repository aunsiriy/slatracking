'use client';

import dynamic from 'next/dynamic';
import { dsReadyPromise } from '@/app/ds-ready.js';

const ViewInner = dynamic(() => dsReadyPromise.then(() => import('./view-inner.jsx')), { ssr: false });

export default function View() {
  return <ViewInner />;
}
