import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg px-6 py-12">
        <div className="relative mb-8">
          <h1 className="text-[120px] font-extrabold text-gray-900 dark:text-white leading-none tracking-tighter">
            4
            <span className="relative inline-block">
              0
              <span className="absolute inset-0 animate-pulse text-blue-500">
                0
              </span>
            </span>
            4
          </h1>

          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="absolute -bottom-4 left-4 w-3/4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-70"></div>
          <div className="absolute -bottom-6 left-8 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-40"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/talent-pool"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
