import { getCharactersPaginationMockData } from '@mocks/mockCharactersData';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';

const searchParams = new URLSearchParams({ details: 'some-information', page: '1' });
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => searchParams,
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
    render(<Pagination charactersData={getCharactersPaginationMockData()} />);

    const nextButton = screen.getByRole('button', { name: '>' });

    fireEvent.click(nextButton);
    expect(toNextPageMock).toBeCalled();
  });

  it('Pagination toPreviousPage is working', async () => {
    render(<Pagination charactersData={getCharactersPaginationMockData()} />);

    const prevButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(prevButton);
    expect(toPrevPageMock).toBeCalled();
  });
});
