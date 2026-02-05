import axiosInstance from "../api/axiosInstance";

export const getExamsBySubject = async (subjectId) => {
  const token = localStorage.getItem("token");
  return axiosInstance.get(`/exams?subject=${subjectId}`, {
    headers: {
      token: token,
    },
  });
};

export const getAllExams = async () => {
  const token = localStorage.getItem("token");
  return axiosInstance.get("/exams", {
    headers: {
      token: token,
    },
  });
};

export const getExamById = async (examId) => {
  const token = localStorage.getItem("token");
  return axiosInstance.get(`/exams/${examId}`, {
    headers: { token: token },
  });
};
export const addExam = (payload) => {
  return axiosInstance.post("/exams", payload);
};

export const checkQuestions = (payload) => {
  return axiosInstance.post("/questions/check", payload);
};
