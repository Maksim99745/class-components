import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import store from '../../../../store/store';
import { Search } from './Search';

const pushMock = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: pushMock,
    pathname: '/',
  }),
}));

describe('Search component', () => {
  it('Search query is correctly passing to the URL', async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    const input = screen.getByPlaceholderText('Enter your search query...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith({ pathname: '/', query: { page: '1', search: 'Luke' } });
  });
});
