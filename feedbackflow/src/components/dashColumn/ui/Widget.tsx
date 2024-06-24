import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function Widget() {
  return (
    <div className="flex w-full">
      <div className="w-full p-4">
      <Card className="w-full max-w-md p-4 space-y-4">
      <CardHeader>
        <CardTitle>Customize Your Widget Design</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="font-semibold">Text</Label>
          <div className="flex items-center space-x-2">
            <Input placeholder="Leave a Review" className="flex-1" />
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Montserrat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
              </SelectContent>
            </Select>
            <Input type="color" value="#FFFFFF" className="w-12 h-12 p-0 border-none" />
          </div>
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Normal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Bold">Bold</SelectItem>
                <SelectItem value="Italic">Italic</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="font-semibold">Background</Label>
          <div className="flex items-center space-x-2">
            <Input type="number" value="10" className="w-16" />
            <Input type="text" value="#5083C1" className="w-24" />
            <div className="w-8 h-8 bg-[#5083C1] border cursor-pointer" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="font-semibold">Position</Label>
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Right Side" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Right Side">Right Side</SelectItem>
                <SelectItem value="Left Side">Left Side</SelectItem>
                <SelectItem value="Top">Top</SelectItem>
                <SelectItem value="Bottom">Bottom</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              {/* <Checkbox id="scrolls-with-page" /> */}
              <Label htmlFor="scrolls-with-page">Scrolls with Page</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch defaultChecked />
            <Label>Sidebar Feedback Widget</Label>
            <InfoIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch />
            <Label>Exit Page Feedback Widget</Label>
            <InfoIcon className="h-4 w-4 text-muted-foreground" />
            <DiscIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch />
            <Label>Hide widget for</Label>
            <Input type="number" value="30" className="w-16" />
            <Label>days</Label>
          </div>
        </div>
      </CardContent>
    </Card>
      </div>
      <div className="p-4 w-full">
        <div className="w-full border border-dashed border-gray-300 h-full flex items-center justify-center">
          <p className="text-gray-500">Open Widget Screen</p>
        </div>
      </div>
    </div>
  )
}

function DiscIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  }
  
  
  function InfoIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    )
  }