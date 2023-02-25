import { getSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Image from "next/image";

export default function Profile(user: User) {
  return (
    <>
      <Image src={user.image!} alt={"avatar"} width={400} height={400} />
      <h1>Profile</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <button
        className={
          "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        }
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: session.user,
  };
};
