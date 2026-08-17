import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <div className="notfound">
        <div>
          <div className="big">404</div>
          <h2 style={{ margin: "14px 0 6px" }}>Level not found</h2>
          <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20 }}>
            The page you are looking for has no XP. Let us take you back to the board.
          </p>
          <Link className="btn primary" href="/">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}