import { fireEvent, render, screen } from '@testing-library/react';
import { assert, describe, expect, it, vi } from 'vitest';
import { mockCharactersData } from '../../../mocks/mockCharactersData';
import CharacterDetails from './CharacterDetails';

const pushMock = vi.fn();
const closeDetailsMock = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    push: pushMock,
    pathname: '/',
  }),
}));

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
    fireEvent.click(screen.getByText('X'));
    expect(closeDetailsMock).toHaveBeenCalled();
  });
});
