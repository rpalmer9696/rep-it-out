import type { Food } from "@/types/global";
import { useState } from "react";
import EditFoodModal from "./EditFoodModal";

type Props = {
  foodCollection: Map<string, Food>;
};

const FoodList = ({ foodCollection }: Props) => {
  const [isEditFoodModelOpen, setIsEditFoodModelOpen] =
    useState<boolean>(false);
  const [editFood, setEditFood] = useState<Food | null>(null);

  return (
    <div>
      {[...foodCollection].map(([id, food]) => (
        <div
          className="flex cursor-pointer flex-row items-center justify-between rounded px-2 py-1 hover:bg-white/40"
          key={id}
          onClick={() => {
            setEditFood(food);
            setIsEditFoodModelOpen(true);
          }}
        >
          <p className="text-xl text-white">{food.name}</p>
          <p className="text-xl text-white">{food.amount}g</p>
        </div>
      ))}
      {editFood && (
        <EditFoodModal
          open={isEditFoodModelOpen}
          onClose={() => setIsEditFoodModelOpen(false)}
          onSave={(food: Food) => {
            setIsEditFoodModelOpen(false);
            foodCollection.set(food.id, food);
          }}
          onDelete={(food: Food) => {
            setIsEditFoodModelOpen(false);
            foodCollection.delete(food.id);
          }}
          food={editFood}
        />
      )}
    </div>
  );
};

export default FoodList;
