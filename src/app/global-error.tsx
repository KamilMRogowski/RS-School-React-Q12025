'use client';
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <div className="error-message">
          <h1>Something went wrong.</h1>
          <h2>Check console to find out more.</h2>
          <h2>Please reload page to try again.</h2>
          <h2>{error.message}</h2>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  );
}
