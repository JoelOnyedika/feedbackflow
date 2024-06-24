import { Switch } from "@/components/ui/switch"

export default function ReviewSelection() {
  return (
    <div className="w-full max-w-md space-y-2 mt-5">
        <span className="font-semibold">Third party review sites</span >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        <Switch aria-label="Toggle Feedback Service A" />
          <img src="/placeholder.svg" width={20} height={20} alt="Service Logo" className="rounded-full" />
          <span className="text-sm">Trust sphere</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        <Switch aria-label="Toggle Feedback Service B" />
          <img src="/placeholder.svg" width={20} height={20} alt="Service Logo" className="rounded-full" />
          <span className="text-sm">Trust sphere</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        <Switch aria-label="Toggle Feedback Service C" />
          <img src="/placeholder.svg" width={20} height={20} alt="Service Logo" className="rounded-full" />
          <span className="text-sm">Trust sphere</span>
        </div>
      </div>
    </div>
  )
}