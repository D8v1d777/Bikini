import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl-50 px-6">
      <div className="text-center">
        <h1 className="font-display text-8xl md:text-12xl font-medium text-sand-200 mb-4">404</h1>
        <h2 className="font-display text-3xl md:text-4xl font-medium text-sand-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-sand-600 text-lg mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back to architecture.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg">Return Home</Button>
          </Link>
          <Link to="/collections">
            <Button size="lg" variant="outline">Browse Collections</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}