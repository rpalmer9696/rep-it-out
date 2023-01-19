import type { Exercise } from "@/types/global";

type Props = {
  exerciseCollection: Exercise[];
};

const ExerciseList = ({ exerciseCollection }: Props) => {
  return (
    <div>
      {exerciseCollection.map((exercise: Exercise, id: number) => (
        <div
          className="flex cursor-pointer flex-row items-center justify-between rounded px-2 py-1 hover:bg-white/40"
          key={id}
        >
          <p className="text-xl text-white">{exercise.name}</p>
          <p className="text-xl text-white">
            {exercise.reps} x {exercise.weight}kg
          </p>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
