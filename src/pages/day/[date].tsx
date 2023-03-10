import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../layout";
import FoodSection from "@/components/FoodSection";
import SupplementSection from "@/components/SupplementSection";
import WorkoutSection from "@/components/WorkoutSection";
import { type GetServerSideProps } from "next";
import { api } from "@/utils/api";

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

  const water = api.water.getForDate.useQuery({
    date: currentDate,
    email: sessionData?.user?.email as string,
  });
  const sleep = api.sleep.getForDate.useQuery({
    date: currentDate,
    email: sessionData?.user?.email as string,
  });

  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [sleepAmount, setSleepAmount] = useState<number>(0);

  const addWater = api.water.setWaterAmount.useMutation();
  const addSleep = api.sleep.setSleepAmount.useMutation();

  useEffect(() => {
    setCurrentDate(`${year}-${month}-${day}`);
  }, [date]);

  useEffect(() => {
    if (water.data) {
      setWaterAmount(water.data.amount);
    }
  }, [water.data]);

  useEffect(() => {
    if (sleep.data) {
      setSleepAmount(sleep.data.amount);
    }
  }, [sleep.data]);

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
            <FoodSection
              currentDate={currentDate}
              email={sessionData?.user?.email as string}
            />
            <div className="p-4"></div>
            <WorkoutSection
              currentDate={currentDate}
              email={sessionData?.user?.email as string}
            />
            <div className="p-4"></div>
            <SupplementSection
              currentDate={currentDate}
              email={sessionData?.user?.email as string}
            />
            <div className="p-4"></div>
            <div className="flex flex-row items-center justify-between">
              <h2 className=" text-3xl text-white">Water</h2>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="number"
                  className="w-24 rounded border border-white p-2 text-right text-xl"
                  value={waterAmount}
                  onChange={(e) => void setWaterAmount(Number(e.target.value))}
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
                  value={sleepAmount}
                  onChange={(e) => void setSleepAmount(Number(e.target.value))}
                />
                <p className="text-2xl text-white">hours</p>
              </div>
            </div>
            <div className="p-8"></div>
            <button
              className="self-end rounded bg-green-400/60 py-2 px-6 text-2xl text-white hover:bg-green-400/80"
              onClick={() => {
                addWater.mutate({
                  email: sessionData?.user?.email as string,
                  date: currentDate,
                  amount: waterAmount,
                });
                addSleep.mutate({
                  email: sessionData?.user?.email as string,
                  date: currentDate,
                  amount: sleepAmount,
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
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
