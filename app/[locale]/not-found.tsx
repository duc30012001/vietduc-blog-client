import { Link } from "@/i18n/navigation";
import { appRoutes } from "@/lib/utils";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                Page Not Found
            </h2>
            <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
                The page you are looking for might have been removed, had its name changed, or is
                temporarily unavailable.
            </p>
            <Link
                href={appRoutes.home}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
                Go to Home
            </Link>
        </div>
    );
}
