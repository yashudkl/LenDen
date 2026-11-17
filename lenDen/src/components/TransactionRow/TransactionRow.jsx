import StatusBadge from "../StatusBadge/StatusBadge";

export const COLS = "md:grid-cols-[1.4fr_1fr_1.6fr_1fr_1fr]";

export default function TransactionRow({ t }) {
  const amountColor = t.type === "lent" ? "text-lenden-primary" : "text-lenden-text-red";
  const amount = t.amount.toLocaleString("en-IN");

  return (
    <div className="border-t border-lenden-border-light px-4 py-3">
      {/* Mobile: two-line card */}
      <div className="flex items-center justify-between md:hidden">
        <div>
          <p className="font-semibold text-lenden-text-dark">{t.person}</p>
          <p className="text-sm text-lenden-text-muted">{t.note}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className={`font-semibold ${amountColor}`}>Rs {amount}</p>
          <StatusBadge status={t.status} />
        </div>
      </div>

      {/* Desktop: grid row */}
      <div className={`hidden items-center text-sm md:grid ${COLS}`}>
        <span className="font-semibold text-lenden-text-dark">{t.person}</span>
        <span className="capitalize text-lenden-text-dark">{t.type}</span>
        <span className="text-lenden-text-muted">{t.note}</span>
        <span className={`font-semibold ${amountColor}`}>{amount}</span>
        <StatusBadge status={t.status} />
      </div>
    </div>
  );
}