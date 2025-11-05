import type { Request, Response } from "express";
type Requisitions = {
    requestId: number,
    requestedBy: string,
    item: string,
    quantity: number,
    department: string,
    dateRequested: string,
    status: "Approved" | "Pending" | "Rejected" | "Completed",
  };
  

const requisitions: Requisitions[] = [

  {
    requestId: 1231,
    requestedBy: "Bath Towels",
    item: "Housekeeping",
    quantity: 450,
    department: "Housekeeping",
    dateRequested: "2025-01-15",
    status: "Approved",
  }
];

export const getRequisitions = (req: Request, res: Response) => {
    if (requisitions.length <= 0) {
        res.status(500).json({ message: "Missing Dashboard Summary" });
      }
      res.status(200).json(requisitions);
};
