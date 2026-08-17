export default function SparkBars({ values }: { values: number[] }) {
  return (
    <div className="spark">
      {values.map((v, i) => (
        <i key={i} style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}