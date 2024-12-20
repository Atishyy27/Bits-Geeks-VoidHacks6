import api from "../../services/api";
import {
  SET_CURRENT_SELECTED_ADMIN,
  SET_CURRENT_SELECTED_TEACHER,
  SET_FACULTY,
  GET_STUDENT_LIST,
  GET_SOME_STUDENT_LIST,
} from "../actionTypes";
import { addError, removeError } from "./error";
import { addSuccess, removeSuccessMessage } from "./success";
import axios from 'axios';

export const setCurrentAdmin = (admin) => ({
  type: SET_CURRENT_SELECTED_ADMIN,
  admin,
});
export const setFaculty = (faculty) => ({
  type: SET_FACULTY,
  faculty,
});

export const getStudents = (students) => ({
  type: GET_STUDENT_LIST,
  students,
});

export const getSomeStudents = (students) => ({
  type: GET_SOME_STUDENT_LIST,
  students,
});

export const setCurrentTeacher = (teacher) => ({
  type: SET_CURRENT_SELECTED_TEACHER,
  teacher,
});

export const getAdmin = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/api/admin', {
      // No Authorization header needed
    });
    dispatch({ type: 'GET_ADMIN_SUCCESS', payload: response.data });
  } catch (err) {
    if (err.response) {
      console.error('Error response:', err.response);
      dispatch({ type: 'GET_ADMIN_FAILURE', payload: err.response.data });
    } else if (err.request) {
      console.error('Error request:', err.request);
      dispatch({ type: 'GET_ADMIN_FAILURE', payload: { message: 'No response received from server.' } });
    } else {
      console.error('Error message:', err.message);
      dispatch({ type: 'GET_ADMIN_FAILURE', payload: { message: err.message } });
    }
  }
};
export const deleteStudents = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.call("put", "admin/deletestudent", data);
      dispatch(addSuccess(response));
      dispatch(removeError());
    } catch (err) {
      dispatch(addError("Something went wrong. Try again."));
    }
  };
};

export const createTeacher = (data) => {
  return async (dispatch) => {
    try {
      const teacher = await api.call("post", "admin/add", data);
      dispatch(setCurrentTeacher(teacher));
      dispatch(removeError());
      dispatch(addSuccess("Faculty added!"));
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getCurrentTeacher = (path) => {
  return async (dispatch) => {
    try {
      const teacher = await api.call("get", `admin/find/${path}`);
      dispatch(setCurrentTeacher(teacher));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const deleteTeacher = (path) => {
  return async (dispatch) => {
    try {
      const teacher = await api.call("delete", `admin/find/${path}`);
      dispatch(setCurrentTeacher(teacher));
      dispatch(removeError());
      let success = "Deleted Successfully!";
      dispatch(addSuccess(success));
    } catch (err) {
      const error = err.response.data;
      dispatch(removeSuccessMessage());
      dispatch(addError(error.message));
    }
  };
};

export const updateAdmin = (path, data) => {
  return async (dispatch) => {
    try {
      const admin = await api.call("put", `admin/update/${path}`, data);
      dispatch(setCurrentAdmin(admin));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const resetPassword = (path, data) => {
  return async (dispatch) => {
    try {
      const admin = await api.call("put", `admin/reset/${path}`, data);
      dispatch(setCurrentAdmin(admin));
      dispatch(removeError());
      dispatch(addSuccess("Password changed!"));
    } catch (err) {
      const error = err.response.data;
      dispatch(removeSuccessMessage());
      dispatch(addError(error.message));
    }
  };
};

export const getFaculty = () => {
  return async (dispatch) => {
    try {
      const faculty = await api.call("get", "admin/all");
      dispatch(setFaculty(faculty));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getStudentList = () => {
  return async (dispatch) => {
    try {
      const students = await api.call("get", "admin/allStudents");
      console.log("in actions", students);
      dispatch(getStudents(students));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const searchStudents = (data) => {
  return async (dispatch) => {
    try {
      const { YEAR, DIV } = data;
      console.log(YEAR + DIV + "year div ");
      let path = "?YEAR=" + YEAR + "&DIV=" + DIV;
      const students = await api.call("get", `admin/findStudents/${path}`);
      if (students.length === 0) {
        dispatch(addError("No students Found"));
      } else {
        dispatch(getSomeStudents(students));
        dispatch(removeError());
      }
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
