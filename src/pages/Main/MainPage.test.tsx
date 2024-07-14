import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import MainPage from './MainPage';

describe('MainPage Component', () => {
  it('Renders the main page', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    expect(true).toBeTruthy();
  });
});
