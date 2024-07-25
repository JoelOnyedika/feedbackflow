"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import Sidebar from "@/components/sidebar/Sidebar"

export default function Panel () {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow flex">
      <main className="flex flex-col gap-6 p-4 md:p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="">
          <CardHeader className="space-y-5">
            <div className="flex items-center justify-between space-x-5">
              <CardTitle>Latest Reviews</CardTitle>
            </div>
            <div className="flex justify-between mt-8">
              <span className="text-sm text-gray-500 dark:text-gray-400">Stars</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Date</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex items-center gap-0.5">
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
              </div>

              <span className="text-sm text-gray-500 dark:text-gray-400">1st, jan 2024</span>
            </div>
          </CardContent>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex items-center gap-0.5">
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
              </div>

              <span className="text-sm text-gray-500 dark:text-gray-400">1st, jan 2024</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Review Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart className="aspect-[16/9]" />
          </CardContent>
        </Card>
      </div>
    </main>
      </div>
    </div>
    
  )
}

function BarChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}


function StarIcon(props:any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}