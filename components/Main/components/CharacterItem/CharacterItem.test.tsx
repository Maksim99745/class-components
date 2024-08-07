import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { assert, describe, expect, it, vi } from 'vitest';
import store from '../../../../store/store';
import { mockCharactersData } from '../../../mocks/mockCharactersData';
import CharacterItem from './CharacterItem';

const characterData = mockCharactersData.results[0];
const pushMock = vi.fn();
const searchParams = new URLSearchParams({ details: 'some-information', page: '1' });

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => searchParams,
}));

describe('CharacterItem Component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <CharacterItem character={characterData} />
      </Provider>,
    );

    const characterCard = screen.getByText('Name: Luke Skywalker');
    assert.exists(characterCard);
  });

  it('opens the detailed card component when clicked', async () => {
    render(
      <Provider store={store}>
        <CharacterItem character={characterData} />
      </Provider>,
    );

    const characterCard = screen.getByText('Name: Luke Skywalker');
    fireEvent.click(characterCard);
    expect(pushMock).toHaveBeenCalledWith('/?page=1&details=Luke Skywalker');
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <Provider store={store}>
        <CharacterItem character={characterData} />
      </Provider>,
    );

    const characterCard = screen.getByText('Name: Luke Skywalker');
    const fetchSpy = vi.spyOn(window, 'fetch');

    fireEvent.click(characterCard);

    assert.exists(fetchSpy);
  });
});
