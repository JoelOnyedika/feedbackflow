import { CircleCheckBig } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface IPricingPlan {
  title: string,
  price: string,
  features: string[],
  due: string,
  status: string
}

const PricingPlan = ({ title, price, features, due, status }: IPricingPlan) => {
  return (
    <div className="bg-white border border-blue-500 shadow-lg rounded-lg space-y-7 p-6">
      <div className="flex  justify-between">
      <h2 className="text-lg text-slate-700 font-bold text-left">{title}</h2>
        <small className="text-purple-500 font-bold hover:neon">{status}</small>
      </div>
      <div className="flex">
        <p className="font-bold text-left text-slate-700 text-3xl">{price}</p>
      <span className="mt-[9px] ml-1">{due}</span>
      </div>
      <ul className="list-disc ">
        {features.map((feature, index) => (
      <li className="py-2 space-x-2 text-left list-none flex" key={index}>
        <CircleCheckBig color="blue" />
        <span>{feature}</span>
      </li>
        ))}
      </ul>
      <div className="flex justify-center">
      <Button variant="info">Upgrade Now</Button>
      </div>
    </div>
  );
};
export default PricingPlan