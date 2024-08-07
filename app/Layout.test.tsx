import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoaderSpinner from '../components/Main/components/LoaderSpinner/LoaderSpinner';
import RootLayout from './layout';

describe('LayoutPage Component', () => {
  it('LayoutPage is rendering as well with it"s children', () => {
    render(
      <RootLayout>
        <LoaderSpinner />
      </RootLayout>,
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeTruthy();
  });
});
