import { useState } from "react";
import axios from "./axiosInstance";

const useGetRequisitions = () => {
  const [loadingForGetRequisitions, setLoadingForGetRequisitions] =
    useState(false);

  const getRequisitions = async () => {
    try {
      setLoadingForGetRequisitions(true);
      const response = await axios.get("/requisitions/get-requisitions");
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
      setLoadingForGetRequisitions(false);
    }
  };

  return {
    getRequisitions,
    loadingForGetRequisitions,
  };
};

export default useGetRequisitions;
