export function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {children}
    </div>
  )
}
