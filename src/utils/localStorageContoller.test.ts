import { getValueFromLocalStorage, setValueToLocalStorage } from './localStorageController';

const mockSetItem = vi.fn();
const mockGetItem = vi.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
  },
});

describe('localStorageController', () => {
  beforeEach(() => {
    mockSetItem.mockClear();
    mockGetItem.mockClear();
  });
  it('check ability to save item', () => {
    setValueToLocalStorage('ss');
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith('class-component', 'ss');
  });
  it('check ability to get item', () => {
    mockGetItem.mockReturnValue('ss');
    const valueFromLocalStorage = getValueFromLocalStorage();
    expect(mockGetItem).toHaveBeenCalledWith('class-component');
    expect(valueFromLocalStorage).toBe('ss');
  });
});
