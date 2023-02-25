import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Home() {
  return (
    <>
      <button
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        }
        onClick={() => signIn("google")}
      >
        Sign In
      </button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/profile",
      permanent: false,
    },
  };
};
