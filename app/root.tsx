/* eslint-disable react-refresh/only-export-components */
import { ThemeProvider } from '@core/themes/ThemeProvider';
import { MetaFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import './App.css';
import './index.scss';

export const meta: MetaFunction = () => [
  { title: 'Star wars' },
  { name: 'description', content: 'Welcome to Star wars world!' },
];

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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </Provider>
  );
}
