import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const STRAPI_URL = "http://localhost:1337/api/garments";

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  fetch(STRAPI_URL)
    .then((result) => result.json())
    .then((result) => res.status(200).json(result));
}
