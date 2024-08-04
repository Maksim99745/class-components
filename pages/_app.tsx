import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import LayoutPage from '../components/Layout/Layout';
import '../components/core/themes/Theme.module.scss';
import { ThemeProvider } from '../components/core/themes/ThemeProvider';
import store from '../store/store';
import './index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LayoutPage>
          <Component {...pageProps} />
        </LayoutPage>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
