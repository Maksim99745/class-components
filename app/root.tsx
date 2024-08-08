import { ThemeProvider } from '@core/themes/ThemeProvider';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import './App.css';
import './index.scss';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            {children}
            <ScrollRestoration />
            <Scripts />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
