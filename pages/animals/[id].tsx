import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAnimalByIdQuery } from "../../types/cms";

const AnimalPage: NextPage = () => {
  const { query } = useRouter();
  const { data, loading } = useAnimalByIdQuery({
    variables: {
      id: "" + query.id,
    },
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{data.animal?.data?.attributes?.name}</h1>

        <div>Leg count: {data.animal?.data?.attributes?.leg_count}</div>
      </main>
    </div>
  );
};

export default AnimalPage;
