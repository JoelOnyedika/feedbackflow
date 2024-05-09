import { feedback_features, feedbackData } from "@/lib/constants/index";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CircleCheckBig, Boxes } from 'lucide-react';
import DoubleCircleIcon from "@/components/custom/DoubleCircleIcon";

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
        <div className="my-5">
          <h3 className="text-2xl break-word font-semibold text-center text-slate-700">
            Powerful, self-serve product to help you drive 5-star reviews, capture feedback, and build trust.
          </h3>
        </div>
        <div>
          {feedbackData.map((data, index) => (
            <div key={index} className="items-center ">
              <DoubleCircleIcon icon={data.icon} />
              <div className="text-center flex flex-col">
              <span className="font-bold">{data.title}</span>
              <span className="mt-2">{data.paragraph}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;