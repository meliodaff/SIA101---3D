import type { Request, Response } from "express";
type Metrics = {
    title: string,
    value: string,
    percentage: string,
    progress: number,
    color: 'green' | 'orange',
  };
  

const metrics: Metrics[] = [

  {
    title: 'Stock Turnover Rate',
    value: '8.5x',
    percentage: '+12%',
    progress: 75,
    color: 'green'
  }
];
type TopMovingItem = {
    name: string,
    value: string,
  };

const topMovingItems: TopMovingItem[] = [
  { 
    name: 'Bath Towels',
    value: '2,450 units' 
  }
];

type CriticalStock = {
    name: string,
    status: 'Low' | 'Medium' | 'Good'
  };
const criticalStocks: CriticalStock[] = [
  { name: 'Cleaning Supplies', status: 'Low'},
  { name: 'Paper Products', status: 'Medium'},
  { name: 'Guest Amenities', status: 'Good'},
  { name: 'Maintenance Tools', status: 'Good'}
];
type WastageItem = {
    name: string,
    cost: string,
  };
const wastageAnalysis = [
  { name: 'Food Items', cost: '₱12,450' },
  { name: 'Damaged Linens', cost: '₱8,200' },
  { name: 'Expired Products', cost: '₱5,670' }
];

export const getMetrics = (req: Request, res: Response) => {
    if (metrics.length <= 0) {
        res.status(500).json({ message: "Missing Metrics" });
      }
      res.status(200).json(metrics);
};
export const getAnalyticsSummary = (req: Request, res: Response) => {
    res.status(200).json({success: true, data: {topMovingItems, criticalStocks, wastageAnalysis}});
};