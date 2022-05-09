import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as RawApolloProvider,
} from "@apollo/client";
import React, { PropsWithChildren } from "react";
import { CONFIG } from "../config/config";

const clientSideApolloClient = new ApolloClient({
  uri: CONFIG.ROUTES.CMS,
  cache: new InMemoryCache(),
});

// NOTE: Server side client. To be used only for public data, cache will be shared across users since this client is to be used in SSR
export const apolloClient = new ApolloClient({
  uri: CONFIG.ROUTES.CMS,
  cache: new InMemoryCache({ resultCaching: false }),
});

export const ApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <RawApolloProvider client={clientSideApolloClient}>{children}</RawApolloProvider>
  );
};
