import type { Request, Response } from "express";
type Requisition = {
    id: string;
    requestId: string;
    requestedBy: string;
    item: string;
    quantity: number;
    department: string;
    dateRequested: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  }
const requisitions: Requisition[] = [
{
    id: '1',
    requestId: 'REQ-00123',
    requestedBy: 'Maria Dela Cruz',
    item: 'Bath Towels',
    quantity: 450,
    department: 'Housekeeping',
    dateRequested: '2025-09-10',
    status: 'Pending'
  },
  {
    id: '2',
    requestId: 'REQ-00124',
    requestedBy: 'John Santos',
    item: 'Key Cards',
    quantity: 80,
    department: 'Front Desk',
    dateRequested: '2025-09-11',
    status: 'Approved'
  },
  {
    id: '3',
    requestId: 'REQ-00125',
    requestedBy: 'Chef Mateo',
    item: 'Wine Glasses',
    quantity: 0,
    department: 'Restaurant',
    dateRequested: '2025-09-12',
    status: 'Rejected'
  },
  {
    id: '4',
    requestId: 'REQ-00126',
    requestedBy: 'Alex Cruz',
    item: 'Soap',
    quantity: 1200,
    department: 'Guest Amenities',
    dateRequested: '2025-09-13',
    status: 'Completed'
  }
];

export const getRequisitions = (req: Request, res: Response) => {
    if (requisitions.length <= 0) {
        res.status(500).json({success: false, message: "Missing Dashboard Summary" });
      }
      res.status(200).json({success: true, data: requisitions});
};
