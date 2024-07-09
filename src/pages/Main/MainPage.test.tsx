import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MainPage from './MainPage';

describe('MainPage Component', () => {
  it('Render the main page', () => {
    render(<MainPage />);
    expect(true).toBeTruthy();
  });
});
