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
    itemCode: 12321,
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
    status: "Out Of Stock",
    department: "Maintenance",
  },
];

const procurement = [
  {
    id: 1,
    orderId: 544125,
    supplier: "ABC Supplies Co.",
    items: 15,
    totalValue: 45000.0,
    status: "Delivered",
    date: "2025-09-10",
  },
  {
    id: 2,
    orderId: 54412223235,
    supplier: "Hotel Essentials Ltd.",
    items: 8,
    totalValue: 28500.0,
    status: "In Transit",
    date: "2025-09-11",
  },
  {
    id: 3,
    orderId: 544125,
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
  type: "positive" | "negative" | "attention";
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
    type: "attention",
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

export const postCurrentInventory = (req: Request, res: Response) => {
  const { itemCode, itemName, category, quantity, status, department } =
    req.body;
  const item = req.body;
  if (
    !itemCode ||
    !itemName ||
    !category ||
    !quantity ||
    !status ||
    !department
  ) {
    res.status(400).json({ success: false, message: "Item Received Missing" });
    return;
  }

  currentInventory.push(item);
  console.log(item);
  res
    .status(200)
    .json({ success: true, data: item, message: "Successfully Added" });
};

export const getRecentProcurementActivities = (req: Request, res: Response) => {
  if (procurement.length <= 0) {
    return res
      .status(500)
      .json({ success: false, message: "Missing Procurement Activities" });
  }

  res.status(200).json({ success: true, data: procurement });
};

export const getDashboardSummary = (req: Request, res: Response) => {
  if (dashboardSummary.length <= 0) {
    return res
      .status(500)
      .json({ success: false, message: "Missing Dashboard Summary" });
  }
  res.status(200).json({ success: true, data: dashboardSummary });
};
