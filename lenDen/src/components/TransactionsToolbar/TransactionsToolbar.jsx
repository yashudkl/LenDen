const tabs = ["all", "lent", "borrowed"];

export default function TransactionsToolbar({ filter, setFilter, sort, setSort, status, setStatus }) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
      {/* Tabs */}
      <div className="flex gap-5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`text-sm capitalize ${
              filter === tab
                ? "font-semibold text-lenden-primary-active"
                : "text-lenden-text-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dropdowns */}
      <div className="flex gap-3 text-sm text-lenden-text-muted">
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-lenden-border-light bg-white px-2 py-1">
          <option value="desc">Sort: Newest</option>
          <option value="asc">Sort: Oldest</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-lenden-border-light bg-white px-2 py-1">
          <option value="any">Status: Any</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>
    </div>
  );
}