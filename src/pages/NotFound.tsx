function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] p-12 text-center">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Go Home
      </a>
    </main>
  );
}

export default NotFound;
