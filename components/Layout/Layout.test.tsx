import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoaderSpinner from '../Main/components/LoaderSpinner/LoaderSpinner';
import LayoutPage from './Layout';

describe('LayoutPage Component', () => {
  it('LayoutPage is rendering as well', () => {
    render(
      <LayoutPage>
        <LoaderSpinner />
      </LayoutPage>,
    );

    const container = screen.getByTestId('theme-container');
    expect(container).toBeTruthy();
  });
});
