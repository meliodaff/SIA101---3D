import { useState } from "react";
import axios from "./axiosInstance";

const useDeleteDashboard = () => {
  const [
    loadingForDeleteCurrentInventory,
    setLoadingForDeleteCurrentInventory,
  ] = useState(false);

  interface InventoryItem {
    id: number;
    itemCode: string;
    itemName: string;
    category: string;
    quantity: number;
    status: "in-stock" | "low-stock" | "out-of-stock";
    department: string;
  }

  const deleteCurrentInventory = async (item: InventoryItem) => {
    try {
      setLoadingForDeleteCurrentInventory(true);
      const response = await axios.delete(
        "/dashboard/delete-current-inventory",
        { data: item }
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
      setLoadingForDeleteCurrentInventory(false);
    }
  };

  return {
    deleteCurrentInventory,
    loadingForDeleteCurrentInventory,
  };
};

export default useDeleteDashboard;
