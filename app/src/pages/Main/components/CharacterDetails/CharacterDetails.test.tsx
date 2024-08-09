import { fireEvent, render, screen } from '@testing-library/react';
import { assert, describe, expect, it, vi } from 'vitest';
import { mockCharactersData } from '../../../../mocks/mockCharactersData';
import CharacterDetails from './CharacterDetails';

vi.mock('@remix-run/react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    actual,
    useNavigate: () => vi.fn(),
    useSearchParams: () => [
      {
        get: vi.fn((param) => {
          if (param === 'page') {
            return '1';
          }
          return null;
        }),
      },
    ],
  };
});

const closeDetailsMock = vi.fn();

vi.mock('./hooks/useHandleDetails', () => ({
  __esModule: true,
  default: () => ({
    closeDetails: closeDetailsMock,
  }),
}));

describe('CharacterDetails Component', () => {
  it('correctly displays the detailed card data', () => {
    render(<CharacterDetails characterDetails={mockCharactersData} />);
    const name = screen.getByText('Name: Luke Skywalker');
    assert.exists(name);
  });

  it('hides the detailed card component when the close button is clicked', () => {
    render(<CharacterDetails characterDetails={mockCharactersData} />);
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(closeDetailsMock).toHaveBeenCalled();
  });
});
