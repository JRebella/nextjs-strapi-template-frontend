import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { apolloClient } from "../graphql/apollo";
import styles from "../styles/Home.module.css";
import { AnimalsByTypeDocument, AnimalsByTypeQuery } from "../types/cms";

// SSR enabled, all data is pre-fetched in the server

const Home: NextPage<{ animalsByTypeQuery: AnimalsByTypeQuery }> = ({
  animalsByTypeQuery,
}) => {
  const [currentAnimalType, setCurrentAnimalType] = useState<string | null>();

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Strapi CMS template</title>
        <meta name="description" content="By Juan Rebella" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next.js + Strapi template</h1>

        <ul className="p-8 shadow-lg border-2 m-4">
          <h2 className="text-xl font-bold">Tech stack</h2>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Strapi v4</li>
          <li>GraphQL + @strapi/plugin-graphql</li>
          <li>Apollo GraphQL Client</li>
          <li>Tailwind CSS</li>
          <li>GraphQL Code Generator</li>
        </ul>

        <div>
          <h2>Animal Types</h2>
          {animalsByTypeQuery.animalTypes?.data.map(({ attributes }) => {
            return (
              <button
                className="text-white bg-blue-600 hover:bg-blue-800 p-3 border-2"
                onClick={() => setCurrentAnimalType(attributes?.name)}
                key={attributes?.name}
              >
                {attributes?.name}
              </button>
            );
          })}
        </div>

        {currentAnimalType && (
          <div>
            {animalsByTypeQuery.animalTypes?.data
              .find((animalType) => animalType.attributes?.name === currentAnimalType)
              ?.attributes?.animals?.data.map((animal) => {
                return (
                  <Link key={animal.attributes?.name} href={`/animals/${animal.id}`}>
                    <button className="text-white bg-green-600 hover:bg-green-800 p-3 border-2">
                      {animal.attributes?.name}
                    </button>
                  </Link>
                );
              })}
          </div>
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await apolloClient.query<AnimalsByTypeQuery>({
    query: AnimalsByTypeDocument,
    fetchPolicy: "no-cache",
  });

  // Pass data to the page via props
  return { props: { animalsByTypeQuery: data } };
}

export default Home;
