export const setValueToLocalStorage = (value: string): void => {
  localStorage.setItem('class-component', value);
};

export const getValueFromLocalStorage = (): string => {
  const value = localStorage.getItem('class-component');
  if (value) {
    return value;
  }
  return '';
};
