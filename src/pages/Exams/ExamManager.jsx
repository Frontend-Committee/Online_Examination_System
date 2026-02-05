import { getAllExams } from "../../services/examService";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Button } from "@material-tailwind/react";
import TakeExam from "./TakeExam";
import { jwtDecode } from "jwt-decode";

const AllExams = () => {
  const [exams, setExams] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");
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
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const examsRes = await getAllExams();

        console.log("Exams API Response:", examsRes);
        console.log("Exams List:", examsRes.data?.exams);
        setExams(examsRes.data?.exams);
      } catch (err) {
        console.error("Error Fetching Data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

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
                        src={exam.img || exam.icon || "/assets/icons/Logo.png"}
                        alt={exam.title}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.target.src = "/assets/icons/Logo.png";
                        }}
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
                      {exam.duration} Minutes
                    </Typography>

                    {userRole === "admin" ? (
                      <Button
                        size="sm"
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
    </div>
  );
};

export default AllExams;
