import { pricingData } from "@/lib/constants/index";

import PricingPlan from "@/components/pricing/PricingPlan"

const Pricing = () => {
    return (
      <div className="mt-5">
        <div className="mb-3">
          <h3 className="text-2xl break-word font-semibold text-left md:text-center text-slate-700">
            Pricing plans 
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {pricingData.map((plan, index) => (
        <PricingPlan key={index} title={plan.title} price={plan.price} features={plan.features} due={plan.due} status={plan.status} />
      ))}
      </div>
      </div>
    )
}

export default Pricing