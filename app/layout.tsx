import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ThemeProvider } from '../components/core/themes/ThemeProvider';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <ThemeProvider>
            <div className="App">{children}</div>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
