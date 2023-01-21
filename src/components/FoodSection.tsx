import AddFoodModal from "./AddFoodModal";
import FoodList from "./FoodList";
import { api } from "@/utils/api";
import type { Food } from "@/types/global";
import { useState } from "react";

type Props = {
  currentDate: string;
  email: string;
};

const FoodSection = ({ currentDate, email }: Props) => {
  const [isAddFoodModelOpen, setIsAddFoodModelOpen] = useState<boolean>(false);
  const [foodCollection, setFoodCollection] = useState<Map<string, Food>>(
    new Map()
  );

  api.food.getForDate.useQuery(
    { date: currentDate, email: email },
    {
      onSuccess: (data) => {
        const foodCollectionMap = new Map<string, Food>();

        data.forEach((food) => foodCollectionMap.set(food.id, food));
        setFoodCollection(foodCollectionMap);
      },
    }
  );

  return (
    <>
      <h2 className="w-full border-b border-white text-3xl text-white">Food</h2>
      <div className="p-2"></div>
      {!!foodCollection.size && <FoodList foodCollection={foodCollection} />}
      {!!foodCollection.size && <div className="p-2"></div>}
      <button
        className=" w-min whitespace-nowrap rounded bg-white/30 p-2 text-white hover:bg-white/40"
        onClick={() => setIsAddFoodModelOpen(true)}
      >
        + Add Food
      </button>
      <AddFoodModal
        open={isAddFoodModelOpen}
        onClose={() => setIsAddFoodModelOpen(false)}
        onSave={(food: Food) => {
          setIsAddFoodModelOpen(false);
          foodCollection.set(food.id, food);
          setFoodCollection(foodCollection);
        }}
        selectedDate={currentDate}
      />
    </>
  );
};

export default FoodSection;
