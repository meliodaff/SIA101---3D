import type { Request, Response } from "express";

const currentInventory = [
  {
    itemCode: 1231,
    itemName: "Bath Towels",
    category: "Housekeeping",
    quantity: 450,
    status: "In Stock",
    department: "Housekeeping",
  },
  {
    itemCode: 1231,
    itemName: "Wine Glasses",
    category: "F&B",
    quantity: 80,
    status: "Low Stock",
    department: "Restaurant",
  },
  {
    itemCode: 1231,
    itemName: "Light Bulbs",
    category: "Maintenance",
    quantity: 0,
    status: "Out of Stock",
    department: "Maintenance",
  },
];

export const getCurrentInventory = (req: Request, res: Response) => {
  res.json(currentInventory);
};
