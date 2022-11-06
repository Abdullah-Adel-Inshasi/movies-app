import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" });
});

export default apiRoute;
