import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card } from "@material-tailwind/react";
import TakeExam from "../Exams/TakeExam";

const SubjectDetails = () => {
  const { subjectId } = useParams();
  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mockData = {
        1: {
          name: "Front-End Quiz",
          sections: [
            {
              title: "Front-End Quiz",
              topics: [
                {
                  id: "t1",
                  name: "HTML",
                  questions: 20,
                  duration: 5,
                  icon: "/assets/icons/html.png",
                },
                {
                  id: "t2",
                  name: "Css",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/css.png",
                },
                {
                  id: "t3",
                  name: "Bootstrap",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/bootstrap.png",
                },
                {
                  id: "t4",
                  name: "JavaScript",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/js.png",
                },
              ],
            },
            {
              title: "Framework Quiz",
              topics: [
                {
                  id: "t5",
                  name: "Angular",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/angular.png",
                },
                {
                  id: "t6",
                  name: "React",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/react.png",
                },
              ],
            },
          ],
        },
      };

      setTimeout(() => {
        setSubjectData(mockData[subjectId]);
        setLoading(false);
      }, 500);
    };
    fetchData();
  }, [subjectId]);

  if (loading)
    return <div className="p-10 text-center">Loading Quizzes...</div>;

  return (
    <div className="w-full space-y-6">
      <div className="pb-10 space-y-8">
        {subjectData?.sections.map((section, sIndex) => (
          <div key={sIndex} className="space-y-4">
            <Typography variant="h6" className="ml-2 font-bold text-Gray">
              {section.title}
            </Typography>

            <div className="space-y-4">
              {section.topics.map((topic) => (
                <Card
                  key={topic.id}
                  className="flex flex-row items-center justify-between p-4 bg-white border shadow-sm border-gray-50 rounded-2xl"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-xl">
                      <img
                        src={topic.icon}
                        alt={topic.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <Typography variant="h6" className="font-bold text-Gray">
                        {topic.name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-medium text-gray-500"
                      >
                        {topic.questions} Question
                      </Typography>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <Typography
                      variant="small"
                      className="mr-2 font-semibold text-gray-700"
                    >
                      {topic.duration} Minutes
                    </Typography>
                    <TakeExam topicData={topic} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDetails;
