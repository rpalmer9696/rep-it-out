import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { z, type ZodError } from "zod";
import type { Exercise } from "@/types/global";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
  selectedDate: string;
};

const ExerciseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  reps: z.number().min(1, { message: "Reps must be at least 1" }),
  weight: z.number().min(1, { message: "Weight must be at least 1kg" }),
});

const AddExerciseModal = ({ open, onClose, onSave, selectedDate }: Props) => {
  const { data: sessionData } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [name, setName] = useState<string>("");
  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const addExercise = api.exercise.create.useMutation();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <div className="max-w-96 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded bg-white px-4 sm:px-8">
      <div className="p-4"></div>
      <h1 className="text-center text-3xl">Add Exercise</h1>
      <div className="p-4"></div>
      {errors.map((error, id) => (
        <p className="text-red-500" key={id}>
          {error}
        </p>
      ))}
      {errors.length > 0 && <div className="p-4"></div>}
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl">Name:</h2>
        <div className="p-4"></div>
        <input
          className="rounded border border-slate-800 bg-transparent p-2 text-xl"
          type="text"
          onInput={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <div className="p-4"></div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl">Reps:</h2>
        <div className="p-4"></div>
        <input
          className="w-24 rounded border border-slate-800 bg-transparent p-2 text-xl"
          type="number"
          onInput={(e) => setReps(parseInt(e.currentTarget.value) || 0)}
        />
      </div>
      <div className="p-4"></div>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl">Weight:</h2>
        <div className="p-4"></div>
        <div className="flex flex-row items-center">
          <input
            className="w-24 rounded border border-slate-800 bg-transparent p-2 text-xl"
            type="number"
            onInput={(e) => setWeight(parseInt(e.currentTarget.value) || 0)}
          />
          <div className="p-1"></div>
          <p className="text-2xl">kg</p>
        </div>
      </div>
      <div className="p-4"></div>
      <div className="flex flex-row justify-between">
        <button
          className="rounded bg-red-600 py-2 px-4 text-xl text-white hover:bg-red-600/80"
          onClick={() => {
            setIsOpen(false);
            setErrors([]);
            onClose();
          }}
        >
          Cancel
        </button>
        <button
          className="rounded bg-green-600 py-2 px-4 text-xl text-white hover:bg-green-600/80"
          onClick={() => {
            try {
              setErrors([]);
              ExerciseSchema.parse({ name, reps, weight });

              addExercise.mutate(
                {
                  name: name,
                  reps: reps,
                  weight: weight,
                  email: sessionData?.user?.email as string,
                  date: selectedDate,
                },
                {
                  onSuccess: (data) => {
                    onSave(data);
                  },
                }
              );
            } catch (e) {
              setErrors((e as ZodError).issues.map((issue) => issue.message));
            }
          }}
        >
          Save
        </button>
      </div>
      <div className="p-4"></div>
    </div>
  );
};

export default AddExerciseModal;
