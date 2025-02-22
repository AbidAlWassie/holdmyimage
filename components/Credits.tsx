import { Github } from "lucide-react";
import Link from "next/link";

export default function Credits() {
  return (
    <div className="grid gap-6 p-6">
      <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
        <p className="text-lg font-semibold flex items-center">
          Developed by
          <Link
            href="https://github.com/abidalwassie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center ml-2"
          >
            <Github className="w-5 h-5 mr-1 text-gray-700 dark:text-gray-200" />
            Abid Al Wassie
          </Link>
        </p>
      </div>
    </div>
  );
}
