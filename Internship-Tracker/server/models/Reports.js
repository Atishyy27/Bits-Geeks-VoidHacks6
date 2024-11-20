import api from "../api"; // Assuming you have an API utility

export const getFortnightlyReport = () => {
  return async (dispatch) => {
    try {
      const response = await api.call("get", "internships/fortnightlyReport");
      dispatch({ type: "SET_FORTNIGHTLY_REPORT", payload: response.data });
    } catch (error) {
      console.error("Error fetching fortnightly report:", error);
    }
  };
};