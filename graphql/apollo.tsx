import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as RawApolloProvider,
} from "@apollo/client";
import React, { PropsWithChildren } from "react";

const clientSideApolloClient = new ApolloClient({
  uri: "http://localhost:1337/graphql", //@TODO
  cache: new InMemoryCache(),
});

export const apolloClient = new ApolloClient({
  uri: "http://localhost:1337/graphql", //@TODO
  cache: new InMemoryCache(),
});

export const ApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <RawApolloProvider client={clientSideApolloClient}>{children}</RawApolloProvider>
  );
};
