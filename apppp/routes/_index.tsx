import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => [
  { title: 'Star wars' },
  { name: 'description', content: 'Find your favorite Star wars character' },
];

export default function Index() {
  return <h1>Welcome to the Homepage</h1>;
}
