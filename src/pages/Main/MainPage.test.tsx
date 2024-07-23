import { store } from '@store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';

describe('MainPage Component', () => {
  it('Main page is rendering as it expected', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Provider>
      </MemoryRouter>,
    );
    const mainPageHeader = screen.getByText('Find your favorite The Star Wars character!');
    assert.exists(mainPageHeader);
  });
});
