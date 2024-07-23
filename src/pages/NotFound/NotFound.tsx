import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1>404 - Page not found</h1>
        <h3>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </h3>
        <button type="button">
          <a href="/">Go back to Home page</a>
        </button>
      </div>
    </div>
  );
}
