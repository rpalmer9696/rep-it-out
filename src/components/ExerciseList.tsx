import type { Exercise } from "@/types/global";
import { useState } from "react";
import EditExerciseModal from "./EditExerciseModal";

type Props = {
  exerciseCollection: Map<string, Exercise>;
};

const ExerciseList = ({ exerciseCollection }: Props) => {
  const [isEditExerciseModelOpen, setIsEditExerciseModelOpen] =
    useState<boolean>(false);
  const [editExercise, setEditExercise] = useState<Exercise | null>(null);

  return (
    <div>
      {[...exerciseCollection].map(([id, exercise]) => (
        <div
          className="flex cursor-pointer flex-row items-center justify-between rounded px-2 py-1 hover:bg-white/40"
          key={id}
          onClick={() => {
            setEditExercise(exercise);
            setIsEditExerciseModelOpen(true);
          }}
        >
          <p className="text-xl text-white">{exercise.name}</p>
          <p className="text-xl text-white">
            {exercise.reps} x {exercise.weight}kg
          </p>
        </div>
      ))}
      {editExercise && (
        <EditExerciseModal
          open={isEditExerciseModelOpen}
          onClose={() => setIsEditExerciseModelOpen(false)}
          onSave={(exercise: Exercise) => {
            setIsEditExerciseModelOpen(false);
            exerciseCollection.set(exercise.id, exercise);
          }}
          onDelete={(exercise: Exercise) => {
            setIsEditExerciseModelOpen(false);
            exerciseCollection.delete(exercise.id);
          }}
          exercise={editExercise}
        />
      )}
    </div>
  );
};

export default ExerciseList;
