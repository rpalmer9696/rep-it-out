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
  const [exerciseCollection, setExerciseCollection] = useState<
    Map<string, Exercise>
  >(new Map());

  api.exercise.getForDate.useQuery(
    { date: currentDate, email: email },
    {
      onSuccess: (data) => {
        const exerciseCollectionMap = new Map<string, Exercise>();

        data.forEach((exercise) =>
          exerciseCollectionMap.set(exercise.id, exercise)
        );
        setExerciseCollection(exerciseCollectionMap);
      },
    }
  );

  return (
    <>
      <h2 className="w-full border-b border-white text-3xl text-white">
        Workout
      </h2>
      <div className="p-2"></div>
      {!!exerciseCollection.size && (
        <ExerciseList exerciseCollection={exerciseCollection} />
      )}
      {!!exerciseCollection.size && <div className="p-2"></div>}
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
          exerciseCollection.set(exercise.id, exercise);
          setExerciseCollection(exerciseCollection);
        }}
        selectedDate={currentDate}
      />
    </>
  );
};

export default WorkoutSection;
