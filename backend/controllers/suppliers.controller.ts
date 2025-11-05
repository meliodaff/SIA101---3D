import type { Request, Response } from "express";

type Suppliers = {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  payables: number;
  products: number;
  portalStatus: string;
  currency: string;
  paymentMethod: string;
  taxes: string;
  courier: string;
  contactDepartment?: string;
  otherContactName?: string;
  otherContactEmail?: string;
  otherContactPhone?: string;
};

const suppliers: Suppliers[] = [
  {
    id: 1,
    companyName: "Lei Corp",
    contactPerson: "Lei Hall",
    email: "leihall@gmail.com",
    phone: "+63927-156-1328",
    address: "Mezzanine Floor, Jb Crystal Building, Quirino Hwy, Quezon City",
    payables: 1000.0,
    products: 12,
    portalStatus: "active",
    currency: "PHP",
    paymentMethod: "Gcash",
    taxes: "Yes",
    courier: "JNT",
    contactDepartment: "Sales Marketing",
    otherContactName: "Jared Gonzales",
    otherContactEmail: "jaredgonzales@gmail.com",
    otherContactPhone: "+63927-156-1328",
  },
  {
    id: 2,
    companyName: "Tech Solutions Inc",
    contactPerson: "John Smith",
    email: "john.smith@techsolutions.com",
    phone: "+63912-345-6789",
    address: "Unit 205, Business Center, Makati City",
    payables: 2500.5,
    products: 8,
    portalStatus: "active",
    currency: "PHP",
    paymentMethod: "Bank Transfer",
    taxes: "Yes",
    courier: "LBC",
  },
  {
    id: 3,
    companyName: "Global Supplies Co",
    contactPerson: "Maria Garcia",
    email: "maria.garcia@globalsupplies.com",
    phone: "+63998-765-4321",
    address: "Building A, Industrial Complex, Quezon City",
    payables: 0.0,
    products: 25,
    portalStatus: "inactive",
    currency: "USD",
    paymentMethod: "Credit Card",
    taxes: "No",
    courier: "Ninja Van",
  },
];

export const getSuppliers = (req: Request, res: Response) => {
  if (suppliers.length <= 0) {
    return res
      .status(500)
      .json({ success: false, message: "No Suppliers Data" });
  }

  res.status(200).json({ success: true, data: suppliers });
};
