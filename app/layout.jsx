import Script from 'next/script';
import ReactGlobalsBridge from './react-globals-bridge.jsx';

const DS_BASE = '/_ds/pea-design-system-newest-cbd18118-ffd4-4a23-9eb9-992de10a0e85';

export const metadata = {
  title: 'PEA-SLA Tracking System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" data-brand="pea" data-theme="light">
      <head>
        <link rel="stylesheet" href={`${DS_BASE}/tokens/primitive.css`} />
        <link rel="stylesheet" href={`${DS_BASE}/tokens/semantic-light.css`} />
        <link rel="stylesheet" href={`${DS_BASE}/tokens/semantic-dark.css`} />
        <link rel="stylesheet" href={`${DS_BASE}/tokens/semantic-high-contrast.css`} />
        <link rel="stylesheet" href={`${DS_BASE}/tokens/tokens.css`} />
        <link rel="stylesheet" href={`${DS_BASE}/tokens/typography.css`} />
        <link rel="stylesheet" href={`${DS_BASE}/pea-ds-react.bundle.css`} />
        <link rel="stylesheet" href={`${DS_BASE}/styles.css`} />
        <link rel="stylesheet" href="/icons.css" />
      </head>
      <body>
        {/*
          ReactGlobalsBridge bridges window.React and loads the two DS
          bundle scripts (strategy="afterInteractive") — see the comment
          in react-globals-bridge.jsx for why they can't be
          strategy="beforeInteractive". Routes await dsReadyPromise
          (ds-ready.js) before rendering anything that touches
          window.DesignSystem_cbd181.
        */}
        <ReactGlobalsBridge />
        {children}
        <Script src="/image-slot.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
