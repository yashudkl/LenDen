const tones = {
  green: "text-lenden-primary",
  red: "text-lenden-text-red",
  blue: "text-lenden-text-blue",
};

export default function StatusCard({
  icon: Icon,
  title,
  amount,
  tone = "green",
  footer,
  className = "",
}) {
  return (
    <div className={"rounded-xl border border-lenden-border-light bg-lenden-bg-card p-5"}>
      {/* Icon + title */}
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${tones[tone]}`} />
        <h3 className="text-xl font-semibold text-lenden-text-dark">{title}</h3>
      </div>

      {/* Amount */}
      <p className={`mt-4 text-xl font-semibold ${tones[tone]}`}>{amount}</p>

      {/* Footer: people count or a message */}
      <div className={"mt-4 flex items-center gap-2 font-semibold text-lenden-text-muted"}>
        {footer}
      </div>
    </div>
  );
}
