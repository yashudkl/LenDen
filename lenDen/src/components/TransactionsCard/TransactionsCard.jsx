import { useState } from "react";
import TransactionsToolbar from "../TransactionsToolbar/TransactionsToolbar";
import TransactionRow, { COLS } from "../TransactionRow/TransactionRow";

export default function TransactionsCard({ transactions }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("desc");
  const [status, setStatus] = useState("any");

  // Derived, not stored
  const rows = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter((t) => status === "any" || t.status === status)
    .sort((a, b) =>
      sort === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    )
    .slice(0, 5);

  return (
    <div className="overflow-hidden rounded-xl border border-lenden-border-light bg-lenden-bg-card">
      <TransactionsToolbar
        filter={filter} setFilter={setFilter}
        sort={sort} setSort={setSort}
        status={status} setStatus={setStatus}
      />

      {/* Column headers: desktop only */}
      <div className={`hidden border-t border-lenden-border-light px-4 py-2 text-sm font-semibold text-lenden-text-muted md:grid ${COLS}`}>
        <span>Person</span><span>Type</span><span>Note</span><span>Amount</span><span>Status</span>
      </div>

      {rows.length === 0 ? (
        <p className="border-t border-lenden-border-light px-4 py-8 text-center text-sm text-lenden-text-muted">
          No transactions yet
        </p>
      ) : (
        rows.map((t) => <TransactionRow key={t.id} t={t} />)
      )}

      <a href="/transactions"
        className="block border-t border-lenden-border-light py-3 text-center text-sm font-semibold text-lenden-text-dark">
        View All
      </a>
    </div>
  );
}