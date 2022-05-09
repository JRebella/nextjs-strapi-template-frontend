# Next.js + Strapi template

A Next.js app template that reads data from a graphQL API in a headless CMS (Strapi)
[Live demo](https://nextjs-strapi-template-frontend.vercel.app/)

Built for [Strapi backend](https://github.com/JRebella/nextjs-strapi-template-backend) but could be used with any graphQL backend

By [Juan Rebella](https://www.juanrebella.dev/)

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Apollo Client](https://www.apollographql.com/) (GraphQL client)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [graphql-codegen](https://www.graphql-code-generator.com/) for generating TS types by reading metadata from the graphQL API

## Run locally

    yarn install

Create a `.env.local` file at the root of the project with the route to your graphQL instance (use .env.local.example as a guide)

```.env
NEXT_PUBLIC_CMS_ROUTE='http://localhost:1337/graphql'
```

Run your [Strapi instance](https://github.com/JRebella/nextjs-strapi-template-backend), then

    yarn dev

## Type generation

Define your queries in `./graphql/*/[yourQuery].graphql`

Verify that `schema` contains the route to your graphQL instance in the `codegen.yml` config file

    schema: "http://localhost:1337/graphql"

Run

    yarn generate-cms-types

This will reach out to your remote graphQL instance and read its metadata generate a `types/cms.tsx` file. This file will contain type definitions based on your graphQL model and the queries you previously defined. It will also include helper hooks to directly use your queries directly in your React components

Example of generated hook

```tsx
export function useAnimalsQuery(
  baseOptions?: Apollo.QueryHookOptions<AnimalsQuery, AnimalsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AnimalsQuery, AnimalsQueryVariables>(AnimalsDocument, options);
}
```

Then use the hook directly in a React component

```tsx
import { useAnimalByIdQuery } from "../../types/cms";

const AnimalPage: NextPage = () => {
  const { data, loading } = useAnimalByIdQuery({
    variables: {
      id: query.id,
    },
  });

  return <div>...</div>;
};
```
