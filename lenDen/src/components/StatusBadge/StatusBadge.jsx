const styles = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-lenden-primary/15 text-lenden-primary-active",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}