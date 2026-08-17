export default function Loading() {
  return (
    <div className="skeleton" aria-busy="true" aria-label="Loading">
      <div className="bars">
        <div className="row" />
        <div className="row" />
        <div className="row" />
      </div>
      <div className="row" />
      <div className="bars">
        <div className="row" />
        <div className="row" />
      </div>
    </div>
  );
}