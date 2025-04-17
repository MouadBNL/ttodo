import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const handlers = {
  GET: async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
  ) {
    res.status(200).json({ message: "up and running" });
  },
};
const { GET } = handlers;
