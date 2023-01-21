import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rep It Out</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Rep It Out
          </h1>
          <h2 className="text-2xl text-white">
            Track your fitness progression like a pro!
          </h2>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
        <footer className="flex h-24 w-full flex-col items-center justify-center">
          <p className="text-white">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/rpalmer9696"
              className="text-underline text-blue-200"
            >
              @rpalmer9696
            </Link>
          </p>
        </footer>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const today = new Date();
  const date = ("0" + today.getDate().toString()).slice(-2);
  const month = ("0" + (today.getMonth() + 1).toString()).slice(-2);
  const year = today.getFullYear();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() =>
          void signIn("google", {
            callbackUrl: `/day/${year}-${month}-${date}`,
          })
        }
      >
        Sign in
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const today = new Date();
  const date = ("0" + today.getDate().toString()).slice(-2);
  const month = ("0" + (today.getMonth() + 1).toString()).slice(-2);
  const year = today.getFullYear();

  if (session) {
    return {
      redirect: {
        destination: `/day/${year}-${month}-${date}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
