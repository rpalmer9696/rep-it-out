import AddSupplementModal from "./AddSupplementModal";
import SupplementList from "./SupplementList";
import { api } from "@/utils/api";
import type { Supplement } from "@/types/global";
import { useState } from "react";

type Props = {
  currentDate: string;
  email: string;
};

const SupplementSection = ({ currentDate, email }: Props) => {
  const [isAddSupplementModelOpen, setIsAddSupplementModelOpen] =
    useState<boolean>(false);
  const [supplementCollection, setSupplementCollection] = useState<
    Supplement[]
  >([]);

  api.supplement.getForDate.useQuery(
    { date: currentDate, email: email },
    {
      onSuccess: (data) => {
        setSupplementCollection(data);
      },
    }
  );

  return (
    <>
      <h2 className="w-full border-b border-white text-3xl text-white">
        Supplement
      </h2>
      <div className="p-2"></div>
      {!!supplementCollection.length && (
        <SupplementList supplementCollection={supplementCollection} />
      )}
      {!!supplementCollection.length && <div className="p-2"></div>}
      <button
        className=" w-min whitespace-nowrap rounded bg-white/30 p-2 text-white hover:bg-white/40"
        onClick={() => setIsAddSupplementModelOpen(true)}
      >
        + Add Supplement
      </button>
      <AddSupplementModal
        open={isAddSupplementModelOpen}
        onClose={() => setIsAddSupplementModelOpen(false)}
        onSave={(supplement: Supplement) => {
          setIsAddSupplementModelOpen(false);
          setSupplementCollection([...supplementCollection, supplement]);
        }}
        selectedDate={currentDate}
      />
    </>
  );
};

export default SupplementSection;
