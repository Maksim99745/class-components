import { Character } from '../../../../models/character';

export const arrayToCSV = (data: Character[]): string => {
  if (data.length === 0) {
    return '';
  }

  function isKeyOfCharacter(key: string): key is keyof Character {
    return key in data[0];
  }

  const headers: Array<keyof Character> = Object.keys(data[0]).filter(isKeyOfCharacter);

  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (Array.isArray(value)) {
            return `"${value.join(',')}"`;
          }
          const escaped = `${value}`.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(','),
    ),
  ];

  return csvRows.join('\n');
};
