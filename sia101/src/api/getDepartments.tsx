import { useState } from "react";
import axios from "./axiosInstance";

const useGetDepartments = () => {
  const [loadingForGetDepartments, setLoadingForGetDepartments] =
    useState(false);
    const [loadingForGetMaintenanceRequest, setLoadingForGetMaintenanceRequest] =
    useState(false);

  const getDepartments= async () => {
    try {
      setLoadingForGetDepartments(true);
      const response = await axios.get("/departments/get-departments");
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
      setLoadingForGetDepartments(false);
    }
  };
  const getMaintenanceRequest= async () => {
    try {
      setLoadingForGetMaintenanceRequest(true);
      const response = await axios.get("/departments/get-maintenance-request");
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
      setLoadingForGetMaintenanceRequest(false);
    }
  };

  return {
    getDepartments,
    loadingForGetDepartments,
    getMaintenanceRequest,
    loadingForGetMaintenanceRequest,


  };
};

export default useGetDepartments;
