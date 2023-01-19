import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../layout";
import AddFoodModal from "../../components/AddFoodModal";
import { api } from "@/utils/api";
import { GetServerSideProps } from "next";
import type { Food } from "@/types/global";

const Day = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { date } = router.query;
  const today = date ? new Date(date as string) : new Date();
  const day = ("0" + today.getDate().toString()).slice(-2);
  const month = ("0" + (today.getMonth() + 1).toString()).slice(-2);
  const year = today.getFullYear();
  const [currentDate, setCurrentDate] = useState<string>(
    `${year}-${month}-${day}`
  );
  const [isAddFoodModelOpen, setIsAddFoodModelOpen] = useState<boolean>(false);
  const [foodCollection, setFoodCollection] = useState<Food[]>([]);

  api.food.getForDate.useQuery(
    { date: currentDate, email: sessionData?.user?.email as string },
    {
      onSuccess: (data) => {
        setFoodCollection(data);
      },
    }
  );

  useEffect(() => {
    setCurrentDate(`${year}-${month}-${day}`);
  }, [date]);

  return (
    <Layout>
      <div className="flex flex-row justify-between p-4">
        <h1 className="text-5xl text-white">Rep It Out</h1>
        <button
          className="rounded-full bg-white/20 px-5 py-3 font-semibold text-white no-underline transition hover:bg-white/40 sm:px-10"
          onClick={() => void signOut()}
        >
          Sign Out
        </button>
      </div>
      <div className="p-4"></div>
      <div className="px-4 sm:px-8 md:px-32 lg:px-96">
        <div className="flex flex-col self-center rounded border border-white p-4 md:px-16">
          <input
            className="cursor-pointer appearance-none self-center rounded border border-white bg-transparent p-2 text-3xl text-white"
            type="date"
            value={currentDate}
            onChange={(e) => void router.push(`/day/${e.target.value}`)}
          />
          <div className="p-4"></div>
          <div className="flex flex-col">
            <h2 className="w-full border-b border-white text-3xl text-white">
              Food
            </h2>
            <div className="p-2"></div>
            {foodCollection.map((food, id) => (
              <div
                className="flex flex-row items-center justify-between"
                key={id}
              >
                <p className="text-xl text-white">{food.name}</p>
                <p className="text-xl text-white">{food.amount}g</p>
              </div>
            ))}
            {!!foodCollection.length && <div className="p-2"></div>}
            <button
              className=" w-min whitespace-nowrap rounded bg-white/30 p-2 text-white hover:bg-white/40"
              onClick={() => setIsAddFoodModelOpen(true)}
            >
              + Add Food
            </button>
            <div className="p-4"></div>
            <h2 className="w-full border-b border-white text-3xl text-white">
              Workout
            </h2>
            <div className="p-2"></div>
            <button className=" w-min whitespace-nowrap rounded bg-white/30 p-2 text-white hover:bg-white/40">
              + Add Exercise
            </button>
            <div className="p-4"></div>
            <h2 className="w-full border-b border-white text-3xl text-white">
              Supplements
            </h2>
            <div className="p-2"></div>
            <button className=" w-min whitespace-nowrap rounded bg-white/30 p-2 text-white hover:bg-white/40">
              + Add Supplement
            </button>
            <div className="p-4"></div>
            <div className="flex flex-row items-center justify-between">
              <h2 className=" text-3xl text-white">Water</h2>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="number"
                  className="w-24 rounded border border-white p-2 text-right text-xl"
                />
                <p className="text-2xl text-white">ml</p>
              </div>
            </div>
            <div className="p-4"></div>
            <div className="flex flex-row items-center justify-between">
              <h2 className=" text-3xl text-white">Sleep</h2>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="number"
                  className="w-24 rounded border border-white p-2 text-right text-xl"
                />
                <p className="text-2xl text-white">hours</p>
              </div>
            </div>
            <div className="p-8"></div>
            <button className="self-end rounded bg-green-400/60 py-2 px-6 text-2xl text-white hover:bg-green-400/80">
              Save
            </button>
          </div>
        </div>
      </div>
      <AddFoodModal
        open={isAddFoodModelOpen}
        onClose={() => setIsAddFoodModelOpen(false)}
        onSave={(food: Food) => {
          setIsAddFoodModelOpen(false);
          setFoodCollection([...foodCollection, food]);
        }}
        selectedDate={currentDate}
      />
    </Layout>
  );
};

export default Day;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
