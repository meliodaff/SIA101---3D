import type { Request, Response } from "express";

export const returnHelloWorld = (req: Request, res: Response) => {
  res.send("testing from index controller");
};
