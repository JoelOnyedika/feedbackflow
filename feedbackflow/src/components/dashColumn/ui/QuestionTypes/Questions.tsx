
import { Button } from "@/components/ui/button"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { X, Plus, Trash2 } from "lucide-react"
import {surveyQuestionOptions} from "@/lib/constants"

export default function Questions({ handleQuestionTypeChange, selectedType }: any) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Question Types</h2>
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost">
            <Plus className="w-5 h-5 text-blue-500" />
            <span className="sr-only">Add List</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className="w-5 h-5 text-red-500" />
            <span className="sr-only">Delete List</span>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <RadioGroup>
          {surveyQuestionOptions.map((data) => (
      <div className="flex items-center space-x-4" onClick={() => handleQuestionTypeChange(data.option)}>
        <RadioGroupItem className="peer sr-only" id={data.option} name={data.name} value={data.option} checked={selectedType === data.option} />
        <Label className="flex items-center space-x-2 cursor-pointer" htmlFor={data.option}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${selectedType === data.option ? 'bg-blue-500' : 'bg-blue-200' } text-white cursor-pointer`} >
            <data.icon className="w-5 h-5" />
          </div>
          <span className="font-medium">{data.name}</span>
        </Label>
      </div>
          ))}
          
        </RadioGroup>
      </div>
    </div>
  )
}

