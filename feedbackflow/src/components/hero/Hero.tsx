import { feedback_features, feedbackData, strategies, pricingData } from "@/lib/constants/index";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CircleCheckBig, Boxes, Sparkles } from 'lucide-react';
import DoubleCircleIcon from "@/components/custom/DoubleCircleIcon";
import PricingPlan from "@/components/pricing/PricingPlan"

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="text-center">
        <div className="space-y-5 w-full flex flex-col justify-center items-center">
          <div className="space-y-5">
              <h1 className="text-4xl font-bold text-slate-700">Capture 5X more 5 star reviews</h1>
            <div className="mt-2">
              <span>Feedback and review automation built for tech, powered by AI</span>
            </div>
            <div className="my-5">
              <Button variant="info" className="text-white">
                <Link href="/signup">Get started</Link>
              </Button>
            </div>
            <div className="p-3 max-w-[1000px] rounded-md bg-slate-300 text-center">
              <span>Build social proof by capturing only the best reviews on TrustPilot, Capterra, G2, Google and more!</span>
            </div>
            <div className="my-5">
              <DoubleCircleIcon icon={Boxes} />
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-5 w-full flex flex-col justify-center items-center">
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl break-word font-semibold text-slate-700">
                  Create custom surveys, collect feedback, and drive more positive reviews
                </h3>  
              </div>
              <div>
                <span className="text-left mt-3">
                  Super easy set up. Just add a snippet of code and start capturing 5-star reviews and other feedback on autopilot
                </span>  
              </div>
              <div className="">
                <ul className="list-none">
                  {feedback_features.map((feature, index) => (
                    <li className="py-2 space-x-2 text-left list-none flex justify-left" key={index}>
                      <CircleCheckBig color="blue" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
            </div> 
            </div>
             
          </div>
        </div>
        
        <div className="my-3 mt-9 w-full">
          <h3 className="text-2xl break-word font-semibold text-slate-700">
            Powerful, self-serve product to help you drive 5-star reviews, capture feedback, and build trust.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full">
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
      
      <div className="mt-5 py-3 w-full text-center">
        <DoubleCircleIcon icon={Sparkles} />
          <h3 className="text-2xl break-word font-semibold text-slate-700">
            Sit back and watch your trust score go up while capturing succinct feedback
          </h3>
        <div className="mt-6">
          <span className="mt-3">
            Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.
          </span>
        </div>
        <div className="w-full">
          <ul className="list-none">
            {strategies.map((data, index) => (
              <li className="py-2 space-x-2 text-left list-none flex items-center justify-center" key={index}>
                <CircleCheckBig color="blue" />
                <span>{data.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 w-full text-center">
        <div className="mb-3">
          <h3 className="text-2xl break-word font-semibold text-slate-700">
            Pricing plans 
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
          {pricingData.map((plan, index) => (
            <PricingPlan key={index} title={plan.title} price={plan.price} features={plan.features} due={plan.due} status={plan.status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
