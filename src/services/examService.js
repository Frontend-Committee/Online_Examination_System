// services/examService.js
import axiosInstance from "../api/axiosInstance";

export const getExamsBySubject = async (subjectId) => {
  const token = localStorage.getItem("token");
  return axiosInstance.get(`/exams`, {
    params: { subject: subjectId },
    headers: { token: token },
  });
};
export const addExam = (payload) => {
  return axiosInstance.post("/exams", payload);
};

export const getExamById = async (examId) => {
  return axiosInstance.get(`/exams/${examId}`);
};

export const checkQuestions = (payload) => {
  return axiosInstance.post("/questions/check", payload);
};
