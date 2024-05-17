import { Button } from "@/components/ui/button";

const YesOrNo = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 whitespace-nowrap">
        How was your experience?
      </h2>
      <span>
        Please let us know how we did by answering the following question.
      </span>

      <div className="flex items-center justify-center gap-4">
        <Button
          className="rounded-full px-6 py-2 text-sm font-medium"
          variant="outline"
        >
          Yes
        </Button>
        <Button
          className="rounded-full px-6 py-2 text-sm font-medium"
          variant="outline"
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default YesOrNo;
