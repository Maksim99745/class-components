'use client';

import { store } from '@store/store';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
