import type { MetaFunction } from '@remix-run/node';
// set the title and description of this page. Useful for SEO
export const meta: MetaFunction = () => [
  { title: 'Hello world' },
  { name: 'description', content: 'Hello world page!' },
];

export default function HomePage() {
  // Display a simple heading to the DOM
  return (
    <div>
      <h1>This is the Hello Route</h1>
    </div>
  );
}
