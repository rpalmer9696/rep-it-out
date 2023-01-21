import type { Supplement } from "@/types/global";

type Props = {
  supplementCollection: Supplement[];
};

const SupplementList = ({ supplementCollection }: Props) => {
  return (
    <div>
      {supplementCollection.map((supplement: Supplement, id: number) => (
        <div
          className="flex cursor-pointer flex-row items-center justify-between rounded px-2 py-1 hover:bg-white/40"
          key={id}
        >
          <p className="text-xl text-white">{supplement.name}</p>
          <p className="text-xl text-white">{supplement.amount}g</p>
        </div>
      ))}
    </div>
  );
};

export default SupplementList;
