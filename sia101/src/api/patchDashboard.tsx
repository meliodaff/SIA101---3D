import { useState } from "react";
import axios from "./axiosInstance";

const usePatchDashboard = () => {
  const [loadingForPatchCurrentInventory, setLoadingForPatchCurrentInventory] =
    useState(false);

  interface InventoryItem {
    id: number;
    itemCode: string;
    itemName: string;
    category: string;
    quantity: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
    department: string;
  }

  const patchCurrentInventory = async (newItem: InventoryItem) => {
    try {
      setLoadingForPatchCurrentInventory(true);
      const response = await axios.patch(
        "/dashboard/patch-current-inventory",
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
      setLoadingForPatchCurrentInventory(false);
    }
  };

  return {
    patchCurrentInventory,
    loadingForPatchCurrentInventory,
  };
};

export default usePatchDashboard;
