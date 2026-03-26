import { SliderInput } from '../ui/SliderInput'

export function StepScale({
  users,
  setUsers,
  usesPerDay,
  setUsesPerDay,
}: {
  users: number
  setUsers: (v: number) => void
  usesPerDay: number
  setUsesPerDay: (v: number) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Set Your Scale</h2>
        <p className="text-sm text-slate-500">
          How many users and how often will they use the model?
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-6">
        <SliderInput
          label="Number of Users"
          value={users}
          onChange={setUsers}
          min={1}
          max={100}
          step={1}
        />
        <SliderInput
          label="Uses per User per Day"
          value={usesPerDay}
          onChange={setUsesPerDay}
          min={1}
          max={10}
          step={1}
        />
      </div>
    </div>
  )
}
