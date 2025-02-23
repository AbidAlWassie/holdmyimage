import { Github } from "lucide-react";
import Link from "next/link";

export default function Credits() {
  return (
    <div className="grid gap-6 p-6">
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg shadow-md">
        {/* <p className="text-lg font-semibold flex items-center text-white">
          Developed by
          <Link
            href="https://github.com/AbidAlWassie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:underline flex items-center ml-2"
          >
            <Github className="w-5 h-5 mr-1 text-amber-300" />
            Abid Al Wassie
          </Link>
        </p> */}
        <p className="text-lg text-white">
          Give it a star ⭐{" "}
          <Link
            href="https://github.com/AbidAlWassie/holdmyimage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:underline"
          >
            GitHub
          </Link>
          . Fork it contribute.
        </p>

        <div className="mt-4">
          <p className="text-base flex items-center text-white">
            Developed by
            <Link
              href="https://github.com/AbidAlWassie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:underline flex items-center ml-2"
            >
              <Github className="w-5 h-5 mr-1 text-amber-300" />
              Abid Al Wassie
            </Link>
          </p>
          {/* <p className="text-sm text-white">
            Give it a star ⭐{" "}
            <Link
              href="https://github.com/AbidAlWassie/holdmyimage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:underline"
            >
              GitHub
            </Link>
            . Fork it contribute.
          </p> */}
        </div>
      </div>
    </div>
  );
}
