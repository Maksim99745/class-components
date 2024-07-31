import ErrorBoundary from '@core/ErrorBoundary/ErrorBoundary';
import { mockCharacterData, mockCharactersData } from '@mocks/mockCharactersData';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import ErrorButton from './ErrorButton';

const mockStore = configureMockStore();
const store = mockStore({ characters: [mockCharactersData], favorites: [mockCharacterData] });

describe('ErrorButtonComponent', async () => {
  it('Click to ErrorButton is casing Error', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ErrorBoundary>
            <ErrorButton />
          </ErrorBoundary>
        </Provider>
      </MemoryRouter>,
    );

    const ErrorButtonHTML = screen.getByText('Error button');
    fireEvent.click(ErrorButtonHTML);
    assert.exists(screen.getByText('Something went wrong.'));
  });
});
