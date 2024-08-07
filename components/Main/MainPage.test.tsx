import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { assert, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockCharacterData, mockCharactersData } from '../mocks/mockCharactersData';
import MainPage from './MainPage';

const mockStore = configureMockStore();
const pushMock = vi.fn();
const searchParamsMock = new URLSearchParams({ details: 'some-detail', page: '1' });

vi.mock('next/navigation', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof Router;
  return {
    ...actual,
    useRouter: () => ({
      push: pushMock,
    }),
    events: {
      on: vi.fn(),
      off: vi.fn(),
    },
    useSearchParams: () => searchParamsMock,
  };
});

describe('MainPage Component', () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;

  beforeEach(() => {
    store = mockStore({ favorites: [mockCharacterData] });
  });

  it('Main page is rendering as it expected', () => {
    render(
      <Provider store={store}>
        <MainPage characterDetails={mockCharactersData} charactersData={mockCharactersData} />
      </Provider>,
    );
    const mainPageHeader = screen.getByText('Find your favorite The Star Wars character!');
    assert.exists(mainPageHeader);
  });

  it('Search button is passing query to the URL', () => {
    render(
      <Provider store={store}>
        <MainPage characterDetails={mockCharactersData} charactersData={mockCharactersData} />
      </Provider>,
    );

    const searchContainer = screen.getByPlaceholderText('Enter your search query...');
    fireEvent.click(searchContainer);
    expect(pushMock).toBeCalled();
  });
});
