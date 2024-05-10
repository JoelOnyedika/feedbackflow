import { feedback_features, feedbackData, strategies, pricingData } from "@/lib/constants/index";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CircleCheckBig, Boxes, Sparkles } from 'lucide-react';
import DoubleCircleIcon from "@/components/custom/DoubleCircleIcon";
import PricingPlan from "@/components/pricing/PricingPlan"

const Hero = () => {
  return (
    <div className="justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl break-all font-bold text-slate-700">Capture 5X more 5 star reviews</h1>
        <div className="mt-2">
          <span>Start automating feedback and positive reviews with 2 lines of code. Make your SaaS or digital product more trustworthy.</span>
        </div>
        <div className="my-5">
          <Button variant="info">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
        <div className="p-3 rounded-md bg-slate-300">
          <span>Build social proof by capturing only the best reviews on TrustPilot, Capterra, G2, Google and more!</span>
        </div>
        <div className="my-5">
          <DoubleCircleIcon icon={Boxes} />
        </div>
        <div className="">
          <h3 className="text-2xl break-word font-semibold text-center text-slate-700">
            Create custom surveys, collect feedback, and drive more positive reviews
          </h3>
        </div>
        <div className="mt-6 text-left items-start">
          <span className="text-left mt-3">
            Super easy set up. Just add a snippet of code and start capturing 5-star reviews and other feedback on autopilot
          </span>
        </div>
        <div className="w-full">
          <ul className="list-none">
            {feedback_features.map((feature, index) => (
              <li className="py-2 space-x-2 text-left list-none flex" key={index}>
                <CircleCheckBig color="blue" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-3 mt-9">
          <h3 className="text-2xl break-word font-semibold text-center text-slate-700">
            Powerful, self-serve product to help you drive 5-star reviews, capture feedback, and build trust.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {feedbackData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <DoubleCircleIcon icon={data.icon} />
              <div className="text-center flex flex-col">
                <span className="font-bold">{data.title}</span>
                <span className="mt-2">{data.paragraph}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-5 py-3">
        <DoubleCircleIcon icon={Sparkles} />
          <h3 className="text-2xl break-word font-semibold text-left md:text-center text-slate-700">
            Sit back and watch your trust score go up while capturing suscinct feedback
          </h3>
        <div className="mt-6 text-left md:text-center items-start">
          <span className="text-left mt-3">
            Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.
          </span>
        </div>
        <div className="w-full">
          <ul className="list-none">
            {strategies.map((data, index) => (
              <li className="py-2 space-x-2 text-left list-none flex" key={index}>
                <CircleCheckBig color="blue" />
                <span>{data.text}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>

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


    </div>
  );
};

export default Hero;