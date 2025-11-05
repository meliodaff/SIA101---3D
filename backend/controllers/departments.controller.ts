import type { Request, Response } from "express";

type Department = {
    id: string;
    name: string;
    manager: string;
    itemsAssigned: number;
    totalUsage: string;
    monthlyConsumption: number;
    requests: number;
};
const departments: Department[] = [
    {
        id: 'DEPT001',
        name: 'Housekeeping',
        manager: 'Maria Santos',
        itemsAssigned: 248,
        totalUsage: '35%',
        monthlyConsumption: 45680,
        requests: 5
      },
      {
        id: 'DEPT002',
        name: 'Maintenance',
        manager: 'Juan Dela Cruz',
        itemsAssigned: 156,
        totalUsage: '18%',
        monthlyConsumption: 28450,
        requests: 3
      },
      {
        id: 'DEPT003',
        name: 'Laundry Services',
        manager: 'Ana Reyes',
        itemsAssigned: 67,
        totalUsage: '6%',
        monthlyConsumption: 18560,
        requests: 2
      },
      {
        id: 'DEPT004',
        name: 'Food & Beverages',
        manager: 'Robert Lim',
        itemsAssigned: 412,
        totalUsage: '28%',
        monthlyConsumption: 78920,
        requests: 8
      },
      {
        id: 'DEPT005',
        name: 'Security',
        manager: 'Carlos Gomez',
        itemsAssigned: 45,
        totalUsage: '5%',
        monthlyConsumption: 9970,
        requests: 1
      },
      {
        id: 'DEPT006',
        name: 'Front Desk',
        manager: 'Lisa Tan',
        itemsAssigned: 89,
        totalUsage: '8%',
        monthlyConsumption: 12340,
        requests: 4
      }
    ];

type DepartmentItem = {
        code: string;
        name: string;
        category: string;
        quantity: number;
        status: string;
};
const departmentItems: Record<string, DepartmentItem[]> = {
'Housekeeping': [
      { code: '1231', name: 'Bath Towels', category: 'Housekeeping', quantity: 450, status: 'In Stock' },
      { code: '1232', name: 'Bed Linens', category: 'Housekeeping', quantity: 320, status: 'In Stock' },
      { code: '1233', name: 'Cleaning Supplies', category: 'Housekeeping', quantity: 45, status: 'Low Stock' },
      { code: '1234', name: 'Toiletries', category: 'Guest Amenities', quantity: 1200, status: 'In Stock' },
      { code: '1235', name: 'Vacuum Cleaners', category: 'Equipment', quantity: 12, status: 'In Stock' }
    ],
    'Maintenance': [
      { code: '2001', name: 'Light Bulbs', category: 'Maintenance', quantity: 0, status: 'Out of Stock' },
      { code: '2002', name: 'Tools', category: 'Maintenance', quantity: 85, status: 'In Stock' }
    ],
    'Laundry Services': [
      { code: '3001', name: 'Detergent', category: 'Laundry', quantity: 45, status: 'Low Stock' },
      { code: '3002', name: 'Fabric Softener', category: 'Laundry', quantity: 32, status: 'In Stock' }
    ],
    'Food & Beverages': [
      { code: '4001', name: 'Wine Glasses', category: 'F&B', quantity: 80, status: 'Low Stock' },
      { code: '4002', name: 'Dinnerware', category: 'F&B', quantity: 250, status: 'In Stock' }
    ],
    'Security': [
      { code: '5001', name: 'Security Cameras', category: 'Security', quantity: 15, status: 'In Stock' }
    ],
    'Front Desk': [
      { code: '6001', name: 'Key Cards', category: 'Front Desk', quantity: 85, status: 'Low Stock' },
      { code: '6002', name: 'Registration Forms', category: 'Front Desk', quantity: 500, status: 'In Stock' }
    ]
};

type MaintenanceRequest = {
    id: string;
    department: string;
    itemService: string;
    requestedBy: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
  };

const maintenanceRequests: MaintenanceRequest[] = [
    {
        id: '#00000',
        department: 'Housekeeping',
        itemService: 'Floor Cleaning Machine Repair',
        requestedBy: 'Name',
        date: '2025-09-10',
        status: 'pending'
      },
      {
        id: '#00000',
        department: 'Maintenance',
        itemService: 'AC Unit Service - Room 305',
        requestedBy: 'Name',
        date: '2025-09-11',
        status: 'approved'
      },
      {
        id: '#00000',
        department: 'F&B',
        itemService: 'Kitchen Equipment Check',
        requestedBy: 'Name',
        date: '2025-09-12',
        status: 'rejected'
      },
      {
        id: '#00000',
        department: 'Housekeeping',
        itemService: 'Linen Replacement - 5th Floor',
        requestedBy: 'Name',
        date: '2025-09-13',
        status: 'completed'
      },
      {
        id: '#00000',
        department: 'Maintenance',
        itemService: 'Elevator Maintenance Check',
        requestedBy: 'Name',
        date: '2025-09-13',
        status: 'completed'
      }
    ];

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

export const getDepartments = (req: Request, res: Response) => {
      res.status(200).json({ success: true, data: {departments, departmentItems,maintenanceRequests,requisitions} });
};
