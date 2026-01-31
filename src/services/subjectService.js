import axiosInstance from "../api/axiosInstance";

export const getSubjects = () => {
  return axiosInstance.get("/subjects");
};

export const addSubject = (formData) => {
  return axiosInstance.post("/subjects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getSubjectById = (id) => {
  return axiosInstance.get(`/subjects/${id}`);
};

export const deleteSubject = (id) => {
  return axiosInstance.delete(`/subjects/${id}`);
};

export const updateSubject = (id, formData) => {
  return axiosInstance.put(`/subjects/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
