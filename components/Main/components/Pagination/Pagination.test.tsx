import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getCharactersPaginationMockData } from '../../../mocks/mockCharactersData';
import Pagination from './Pagination';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: vi.fn(),
    pathname: '/',
  }),
}));

const toPrevPageMock = vi.fn();
const toNextPageMock = vi.fn();

vi.mock('../../hooks/usePagination', () => ({
  __esModule: true,
  default: () => ({
    toPrevPage: toPrevPageMock,
    toNextPage: toNextPageMock,
  }),
}));

describe('Pagination Component', () => {
  it('Pagination toNextPage is working', async () => {
    render(
      <Pagination
        charactersData={getCharactersPaginationMockData()}
        currentPage={1}
        toPrevPage={toPrevPageMock}
        toNextPage={toNextPageMock}
      />,
    );

    const nextButton = screen.getByRole('button', { name: '>' });

    fireEvent.click(nextButton);
    expect(toNextPageMock).toBeCalled();
  });

  it('Pagination toPreviousPage is working', async () => {
    render(
      <Pagination
        charactersData={getCharactersPaginationMockData()}
        currentPage={2}
        toPrevPage={toPrevPageMock}
        toNextPage={toNextPageMock}
      />,
    );

    const prevButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(prevButton);
    expect(toPrevPageMock).toBeCalled();
  });
});
