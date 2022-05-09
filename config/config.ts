if (!process.env.NEXT_PUBLIC_CMS_ROUTE) {
  throw new Error(
    "ERROR loading environment variables. Missing .env.local file? Use .env.local.example as example\n\n"
  );
}

export const CONFIG = {
  ROUTES: {
    CMS: process.env.NEXT_PUBLIC_CMS_ROUTE!,
  },
};
