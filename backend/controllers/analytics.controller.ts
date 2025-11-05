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

export const getMetrics = (req: Request, res: Response) => {
    if (metrics.length <= 0) {
        res.status(500).json({ message: "Missing Metrics" });
      }
      res.status(200).json(metrics);
};
