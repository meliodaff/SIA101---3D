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

const procurement = [
  {
    orderId: 544125,
    supplier: "ABC Supplies Co.",
    items: 15,
    totalValue: 45000.0,
    status: "Delivered",
    date: "2025-09-10",
  },
  {
    supplier: "Hotel Essentials Ltd.",
    items: 8,
    totalValue: 28500.0,
    status: "In Transit",
    date: "2025-09-11",
  },
  {
    supplier: "Quality Linens Inc.",
    items: 20,
    totalValue: 67800.0,
    status: "Pending",
    date: "2025-09-12",
  },
];

type DashboardSummary = {
  title: string;
  value: number;
  change: string;
  type: "positive" | "negative";
};

const dashboardSummary: DashboardSummary[] = [
  {
    title: "Total Items",
    value: 1974,
    change: "+15% from last month",
    type: "positive",
  },
  {
    title: "Low Stock Items",
    value: 56,
    change: "Requires Attention",
    type: "negative",
  },
  {
    title: "Pending Orders",
    value: 99,
    change: "-5% from last month",
    type: "negative",
  },
  {
    title: "Total Value",
    value: 867,
    change: "+8% from last month",
    type: "positive",
  },
];

export const getCurrentInventory = (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: currentInventory });
};

export const getRecentProcurementActivities = (req: Request, res: Response) => {
  res.status(200).json(procurement);
};

export const getDashboardSummary = (req: Request, res: Response) => {
  if (dashboardSummary.length <= 0) {
    return res
      .status(500)
      .json({ success: false, message: "Missing Dashboard Summary" });
  }
  res.status(200).json({ success: true, data: dashboardSummary });
};
