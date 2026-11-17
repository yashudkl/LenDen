import { useState } from "react";
import Nav from "../components/Nav/Nav";

const TYPES = [
  { value: "lent", label: "Lent", hint: "I gave money" },
  { value: "borrowed", label: "Borrowed", hint: "I took money" },
  { value: "received", label: "Received", hint: "They paid me back" },
  { value: "paid", label: "Paid", hint: "I paid them back" },
];

const inputClass =
  "w-full rounded-lg border border-lenden-border-light bg-white px-3 py-2.5 text-lenden-text-dark outline-none focus:border-lenden-border-focus";

const fmt = (n) => n.toLocaleString("en-IN");

export default function AddTransaction({ people = [], transactions = [], onSave }) {
  const today = new Date().toISOString().slice(0, 10);

  const [type, setType] = useState("lent");
  const [personId, setPersonId] = useState("");
  const [newName, setNewName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState({});

  // ---- Derived values (nothing stored) ----
  const repayment = type === "received" || type === "paid";

  // Outstanding per person: { [person_id]: { lent, borrowed } }
  const balances = {};
  for (const t of transactions) {
    const b = (balances[t.person_id] ??= { lent: 0, borrowed: 0 });
    const amt = Number(t.amount); // Supabase numeric can arrive as a string
    if (t.type === "lent") b.lent += amt;
    if (t.type === "received") b.lent -= amt;
    if (t.type === "borrowed") b.borrowed += amt;
    if (t.type === "paid") b.borrowed -= amt;
  }

  // Repayments only list people with something outstanding on the right side
  const side = type === "received" ? "lent" : "borrowed";
  const pickable = repayment
    ? people
        .map((p) => ({ ...p, outstanding: balances[p.id]?.[side] ?? 0 }))
        .filter((p) => p.outstanding > 0)
    : people;

  const noOptions = pickable.length === 0;
  const isNew = !repayment && (noOptions || personId === "new");

  // ---- Handlers ----
  function handleType(next) {
    setType(next);
    setPersonId(""); // valid people change with the type
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    const amt = Number(amount);

    if (isNew && !newName.trim()) errs.person = "Enter a name";
    if (!isNew && !personId) errs.person = "Select a person";
    if (!(amt > 0)) errs.amount = "Enter an amount greater than 0";

    if (repayment && personId) {
      const max = pickable.find((p) => p.id === personId)?.outstanding ?? 0;
      if (amt > max) errs.amount = `Max Rs ${fmt(max)} outstanding`;
    }

    setErrors(errs);
    if (Object.keys(errs).length) return;

    onSave?.({
      type,
      person_id: isNew ? null : personId,
      new_person_name: isNew ? newName.trim() : null,
      amount: amt,
      note: note.trim(),
      date,
    });
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-lenden-bg-page px-4 pt-20 md:pl-65 md:pr-5">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-xl flex-col gap-5 rounded-xl border border-lenden-border-light bg-lenden-bg-card p-4 md:p-6"
        >
          <h1 className="text-lg font-semibold text-lenden-text-dark md:text-xl">
            Add Transaction
          </h1>

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-lenden-text-dark">Type</span>
            <div className="grid grid-cols-2 gap-3">
              {TYPES.map((o) => (
                <button
                  type="button"
                  key={o.value}
                  onClick={() => handleType(o.value)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    type === o.value
                      ? "border-lenden-primary bg-lenden-primary/10"
                      : "border-lenden-border-light bg-white"
                  }`}
                >
                  <p className="font-semibold text-lenden-text-dark">{o.label}</p>
                  <p className="text-sm text-lenden-text-muted">{o.hint}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Person */}
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-lenden-text-dark">Person</span>

            {repayment && noOptions ? (
              <p className="text-sm text-lenden-text-muted">
                No one has an outstanding balance for this.
              </p>
            ) : (
              <>
                {!noOptions && (
                  <select
                    value={personId}
                    onChange={(e) => setPersonId(e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>Select a person</option>
                    {pickable.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                        {repayment && ` (Rs ${fmt(p.outstanding)})`}
                      </option>
                    ))}
                    {!repayment && <option value="new">+ Add new person</option>}
                  </select>
                )}

                {isNew && (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={noOptions ? "No people yet. Enter a name" : "New person's name"}
                    className={inputClass}
                  />
                )}
              </>
            )}

            {errors.person && <span className="text-sm text-lenden-text-red">{errors.person}</span>}
          </div>

          {/* Amount */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-lenden-text-dark">Amount (Rs)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="5000"
              className={inputClass}
            />
            {errors.amount && <span className="text-sm text-lenden-text-red">{errors.amount}</span>}
          </label>

          {/* Note */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-lenden-text-dark">Note (optional)</span>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Rent help"
              className={inputClass}
            />
          </label>

          {/* Date */}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-lenden-text-dark">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            className="rounded-lg bg-lenden-primary py-3 font-semibold text-white hover:bg-lenden-primary-hover active:bg-lenden-primary-active"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </>
  );
}