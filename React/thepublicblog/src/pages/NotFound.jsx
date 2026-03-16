import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="font-display text-8xl font-semibold text-amber">404</h1>
      <p className="text-xl text-muted font-light">This page doesn't exist.</p>
      <Link to="/" className="text-sm text-amber hover:underline mt-2">
        Go back home →
      </Link>
    </div>
  );
}