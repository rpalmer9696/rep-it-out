import type { Food } from "@/types/global";

type Props = {
  foodCollection: Food[];
};

const FoodList = ({ foodCollection }: Props) => {
  return (
    <div>
      {foodCollection.map((food: Food, id: number) => (
        <div
          className="flex cursor-pointer flex-row items-center justify-between rounded px-2 py-1 hover:bg-white/40"
          key={id}
        >
          <p className="text-xl text-white">{food.name}</p>
          <p className="text-xl text-white">{food.amount}g</p>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
