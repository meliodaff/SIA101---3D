import { useState } from "react";
import axios from "./axiosInstance";

const useGetDashboard = () => {
  const [loadingForGetCurrentInventory, setLoadingForGetCurrentInventory] =
    useState(false);
  const [loadingForGetRecentProcurement, setLoadingForGetRecentProcurement] =
    useState(false);
  const [loadingForGetDashboardSummary, setLoadingForGetDashboardSummary] =
    useState(false);
  const [loadingForPostCurrentInventory, setLoadingForPostCurrentInventory] =
    useState(false);

  const getDashboardSummary = async () => {
    try {
      setLoadingForGetDashboardSummary(true);
      const response = await axios.get("/dashboard/get-dashboard-summary");
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.status >= 400) {
        return {
          success: false,
          message: error.response.data.message,
        };
      }
      return {
        success: false,
        message: "API calling failed",
      };
    } finally {
      setLoadingForGetDashboardSummary(false);
    }
  };

  const getCurrentInventory = async () => {
    try {
      setLoadingForGetCurrentInventory(true);
      const response = await axios.get("/dashboard/get-current-inventory");
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.status >= 400) {
        return {
          success: false,
          message: error.response.data.message,
        };
      }
      return {
        success: false,
        message: "API calling failed",
      };
    } finally {
      setLoadingForGetCurrentInventory(false);
    }
  };

  const getRecentProcurement = async () => {
    try {
      setLoadingForGetRecentProcurement(true);
      const response = await axios.get("/dashboard/get-recent-procurement");
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.status >= 400) {
        return {
          success: false,
          message: error.response.data.message,
        };
      }
      return {
        success: false,
        message: "API calling failed",
      };
    } finally {
      setLoadingForGetRecentProcurement(false);
    }
  };

  interface InventoryItem {
    id: number;
    itemCode: string;
    itemName: string;
    category: string;
    quantity: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
    department: string;
  }

  const postCurrentInventory = async (newItem: InventoryItem) => {
    try {
      setLoadingForPostCurrentInventory(true);
      const response = await axios.post(
        "/dashboard/post-current-inventory",
        newItem
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.status >= 400) {
        return {
          success: false,
          message: error.response.data.message,
        };
      }
      return {
        success: false,
        message: "API calling failed",
      };
    } finally {
      setLoadingForPostCurrentInventory(false);
    }
  };

  return {
    getCurrentInventory,
    loadingForGetCurrentInventory,
    getRecentProcurement,
    loadingForGetRecentProcurement,
    getDashboardSummary,
    loadingForGetDashboardSummary,
    postCurrentInventory,
    loadingForPostCurrentInventory,
  };
};

export default useGetDashboard;
