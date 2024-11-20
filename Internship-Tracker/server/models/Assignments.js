import api from "../api"; // Assuming you have an API utility

export const fetchAssignments = () => {
  return async (dispatch) => {
    try {
      const response = await api.call("get", "assignments");
      dispatch({ type: "SET_ASSIGNMENTS", payload: response.data });
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };
};

export const createAssignment = (assignment) => {
  return async (dispatch) => {
    try {
      const response = await api.call("post", "assignments", assignment);
      dispatch({ type: "ADD_ASSIGNMENT", payload: response.data });
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };
};