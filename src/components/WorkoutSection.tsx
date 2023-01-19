import AddExerciseModal from "./AddExerciseModal";
import ExerciseList from "./ExerciseList";
import { api } from "@/utils/api";
import type { Exercise } from "@/types/global";
import { useState } from "react";

type Props = {
  currentDate: string;
  email: string;
};

const WorkoutSection = ({ currentDate, email }: Props) => {
  const [isAddExerciseModelOpen, setIsAddExerciseModelOpen] =
    useState<boolean>(false);
  const [exerciseCollection, setExerciseCollection] = useState<Exercise[]>([]);

  api.exercise.getForDate.useQuery(
    { date: currentDate, email: email },
    {
      onSuccess: (data) => {
        setExerciseCollection(data);
      },
    }
  );

  return (
    <>
      <h2 className="w-full border-b border-white text-3xl text-white">
        Workout
      </h2>
      <div className="p-2"></div>
      {!!exerciseCollection.length && (
        <ExerciseList exerciseCollection={exerciseCollection} />
      )}
      {!!exerciseCollection.length && <div className="p-2"></div>}
      <button
        className=" w-min whitespace-nowrap rounded bg-white/30 p-2 text-white hover:bg-white/40"
        onClick={() => setIsAddExerciseModelOpen(true)}
      >
        + Add Exercise
      </button>
      <AddExerciseModal
        open={isAddExerciseModelOpen}
        onClose={() => setIsAddExerciseModelOpen(false)}
        onSave={(exercise: Exercise) => {
          setIsAddExerciseModelOpen(false);
          setExerciseCollection([...exerciseCollection, exercise]);
        }}
        selectedDate={currentDate}
      />
    </>
  );
};

export default WorkoutSection;
