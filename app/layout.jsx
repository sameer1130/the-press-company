import './globals.css';

export const metadata = {
  title: 'The Press Company — Strategy for brands worth building',
  description: 'A strategy studio for marketing leaders who are tired of decks that read like mood boards. Five verticals. One strategic lens.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="default">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
