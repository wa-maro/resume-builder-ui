// src/pages/Unauthorized.tsx

import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] p-12 text-center">
      <h1 className="text-5xl font-bold text-red-600">401</h1>
      <p className="mt-4 text-2xl text-gray-700">Unauthorized</p>
      <p className="mt-2 text-gray-500">
        You don't have permission to access this page.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Go Home
      </Link>
    </main>
  );
};

export default Unauthorized;
