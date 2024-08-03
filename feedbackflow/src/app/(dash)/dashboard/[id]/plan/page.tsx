import { pricingData } from "@/lib/constants/index";
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar/Sidebar"
import Navbar from "@/components/hero/Navbar";

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow flex">
            <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-6 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing Plans</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Choose the plan that fits your needs. No hidden fees, ever.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {pricingData.map((plan: any) => (
            <div className="flex flex-col items-start rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                  <div className="mb-4 flex w-full items-center justify-between">
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                    <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800">{plan.popular}</div>
                  </div>
                  <div className="mb-6 flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">per month</span>
                  </div>
                  <ul className="mb-8 grid gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {plan.features.map((feature: any) => (
              <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 fill-primary" />
                      {feature}
                    </li>
                    ))}
                    
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>

  )
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default Pricing