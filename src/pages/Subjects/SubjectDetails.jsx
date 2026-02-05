import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Button,
  Dialog,
  DialogBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TakeExam from "../Exams/TakeExam";
import { getExamsBySubject, getExamById } from "../../services/examService";
import { getSubjectById } from "../../services/subjectService";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const SubjectDetails = () => {
  const { subjectId } = useParams();
  const [exams, setExams] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");

  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [activeExamId, setActiveExamId] = useState("");
  const [categoryApiId, setCategoryApiId] = useState("");

  const [questionText, setQuestionText] = useState("");
  const [optionList, setOptionList] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState("A1");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (err) {
        console.error("Invalid token");
      }
    }

    const fetchAllData = async (id) => {
      if (!id) return;
      try {
        setLoading(true);
        const subjectRes = await getSubjectById(id);
        const catId = subjectRes.data?.category?._id;

        setCategoryApiId(catId);
        setSubjectName(subjectRes.data?.category?.name || "Subject");

        if (catId) {
          const examsRes = await getExamsBySubject(catId);
          setExams(examsRes.data?.exams || []);
        }
      } catch (err) {
        console.error("Error Fetching Data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (subjectId) {
      fetchAllData(subjectId);
    }
  }, [subjectId]);

  const handlePostQuestion = async (keepOpen = false) => {
    const token = localStorage.getItem("token");
    const payload = {
      question: questionText,
      A1: optionList[0],
      A2: optionList[1],
      A3: optionList[2],
      A4: optionList[3],
      correct: correctIndex,
      subject: categoryApiId,
      exam: activeExamId,
    };

    try {
      const res = await axios.post(
        "https://exam.elevateegy.com/api/v1/questions",
        payload,
        {
          headers: { token },
        },
      );

      setQuestionText("");
      setOptionList(["", "", "", ""]);
      setCorrectIndex("A1");

      if (!keepOpen) {
        setOpenAddQuestion(false);
      }
    } catch (err) {
      console.error("Failed:", err.response?.data || err.message);
    }
  };

  const handleOptionUpdate = (index, val) => {
    const updated = [...optionList];
    updated[index] = val;
    setOptionList(updated);
  };

  if (loading)
    return (
      <div className="p-10 font-bold text-center text-main-blue">
        Loading Quizzes...
      </div>
    );

  return (
    <div className="w-full space-y-6">
      <div className="pb-10 space-y-8">
        <div className="space-y-4">
          <Typography
            variant="h6"
            className="ml-2 font-bold tracking-wider uppercase text-main-blue"
          >
            {subjectName || "Available Quizzes"}
          </Typography>

          <div className="space-y-4">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <Card
                  key={exam._id}
                  className="flex flex-row items-center justify-between p-4 bg-white border shadow-sm border-gray-50 rounded-2xl"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 overflow-hidden border border-gray-100 rounded-xl bg-gray-50">
                      <img
                        src={exam.img || "/assets/icons/Logo.png"}
                        alt=""
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        className="font-bold text-blue-gray-800"
                      >
                        {exam.title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-medium text-gray-500"
                      >
                        {exam.numberOfQuestions} Questions
                      </Typography>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <Typography
                      variant="small"
                      className="mr-2 font-semibold text-gray-700"
                    >
                      {exam.duration} Min
                    </Typography>
                    {userRole === "admin" ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          setActiveExamId(exam._id);
                          setOpenAddQuestion(true);
                        }}
                        className="px-4 capitalize rounded-lg bg-main-blue"
                      >
                        Add Questions
                      </Button>
                    ) : (
                      <TakeExam topicData={exam} />
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">
                No quizzes available for {subjectName}.
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        size="md"
        open={openAddQuestion}
        handler={() => setOpenAddQuestion(false)}
        className="p-6 rounded-[2rem] outline-none overflow-y-auto max-h-[90vh]"
      >
        <DialogBody>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className="p-1 border-2 rounded-full cursor-pointer border-main-blue"
                onClick={() => setOpenAddQuestion(false)}
              >
                <ArrowLeftIcon className="h-4 w-4 text-main-blue stroke-[3]" />
              </div>
              <Typography className="text-2xl font-bold text-main-blue">
                Add Question
              </Typography>
            </div>
            <div className="w-48">
              <Select
                label="Correct Answer"
                value={correctIndex}
                onChange={(val) => setCorrectIndex(val)}
              >
                <Option value="A1">Answer 1</Option>
                <Option value="A2">Answer 2</Option>
                <Option value="A3">Answer 3</Option>
                <Option value="A4">Answer 4</Option>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Typography className="mb-2 text-sm font-bold text-gray-500">
                Question Title
              </Typography>
              <Input
                size="lg"
                placeholder="Enter question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="rounded-xl"
                labelProps={{ className: "hidden" }}
              />
            </div>

            {optionList.map((opt, idx) => (
              <div key={idx}>
                <Typography className="mb-2 text-sm font-bold text-gray-500">
                  Answer {idx + 1}
                </Typography>
                <Input
                  size="lg"
                  placeholder={`Answer ${idx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionUpdate(idx, e.target.value)}
                  className="rounded-xl"
                  labelProps={{ className: "hidden" }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 mt-10 md:flex-row">
            <button
              onClick={() => setOpenAddQuestion(false)}
              className="w-full px-10 py-2 font-semibold border md:w-auto border-main-blue text-main-blue rounded-xl"
            >
              Back
            </button>
            <div className="flex w-full gap-3 md:w-auto">
              <button
                className="flex-1 px-6 py-2 font-bold text-white shadow-md bg-main-blue rounded-xl"
                onClick={() => handlePostQuestion(true)}
              >
                Add Another question
              </button>
              <button
                className="flex-1 px-10 py-2 font-bold text-white shadow-md bg-main-blue rounded-xl"
                onClick={() => handlePostQuestion(false)}
              >
                Done
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default SubjectDetails;
