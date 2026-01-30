import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const HistoryDetails = () => {
  const { subjectId } = useParams();
  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleOpen = (topic = null) => {
    setSelectedTopic(topic);
    setOpen(!open);
  };

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
                  duration: 15,
                  icon: "/assets/icons/html.png",
                  result: "18 corrected answers in 12 min.",
                  details: [
                    {
                      q: "What does HTML stand for?",
                      options: [
                        "Hyper Text Markup Language",
                        "Home Tool Markup Language",
                        "Hyperlinks and Text Markup Language",
                      ],
                      correct: 0,
                      user: 0,
                    },
                    {
                      q: "Who is making the Web standards?",
                      options: [
                        "Google",
                        "Microsoft",
                        "The World Wide Web Consortium",
                      ],
                      correct: 2,
                      user: 2,
                    },
                    {
                      q: "Choose the correct HTML element for the largest heading:",
                      options: ["<heading>", "<h1>", "<h6>"],
                      correct: 1,
                      user: 1,
                    },
                    {
                      q: "What is the correct HTML element for inserting a line break?",
                      options: ["<br>", "<lb>", "<break>"],
                      correct: 0,
                      user: 2,
                    },
                  ],
                },
                {
                  id: "t2",
                  name: "Css",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/css.png",
                  result: "18 corrected answers in 14 min.",
                  details: [
                    {
                      q: "What does CSS stand for?",
                      options: [
                        "Computer Style Sheets",
                        "Cascading Style Sheets",
                        "Creative Style Sheets",
                      ],
                      correct: 1,
                      user: 1,
                    },
                    {
                      q: "Which HTML tag is used to define an internal style sheet?",
                      options: ["<css>", "<script>", "<style>"],
                      correct: 2,
                      user: 0,
                    },
                    {
                      q: "Which HTML attribute is used to define inline styles?",
                      options: ["font", "styles", "style"],
                      correct: 2,
                      user: 2,
                    },
                  ],
                },
                {
                  id: "t3",
                  name: "Bootstrap",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/bootstrap.png",
                  result: "18 corrected answers in 14 min.",
                  details: [
                    {
                      q: "Bootstrap 5 uses which language for styling?",
                      options: ["Less", "Sass", "Stylus"],
                      correct: 1,
                      user: 1,
                    },
                  ],
                },
                {
                  id: "t4",
                  name: "JavaScript",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/js.png",
                  result: "18 corrected answers in 10 min.",
                  details: [
                    {
                      q: "Inside which HTML element do we put the JavaScript?",
                      options: ["<js>", "<script>", "<javascript>"],
                      correct: 1,
                      user: 1,
                    },
                  ],
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
                  result: "18 corrected answers in 10 min.",
                  details: [
                    {
                      q: "Which decorator is used for a class to be an Angular component?",
                      options: ["@Component", "@Directive", "@Injectable"],
                      correct: 0,
                      user: 0,
                    },
                  ],
                },
                {
                  id: "t6",
                  name: "React",
                  questions: 20,
                  duration: 15,
                  icon: "/assets/icons/react.png",
                  result: "18 corrected answers in 14 min.",
                  details: [
                    {
                      q: "What is the correct command to create a new React project?",
                      options: [
                        "npx create-react-app my-app",
                        "npm install react",
                        "npx create-app",
                      ],
                      correct: 0,
                      user: 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
      };

      setTimeout(() => {
        setSubjectData(mockData[subjectId || 1]);
        setLoading(false);
      }, 500);
    };
    fetchData();
  }, [subjectId]);

  if (loading)
    return (
      <div className="p-10 font-bold text-center text-Gray">
        Loading History...
      </div>
    );

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
                      <Typography className="text-[11px] font-medium text-main-blue mt-1">
                        {topic.result}
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
                    <Button
                      onClick={() => handleOpen(topic)}
                      size="sm"
                      className="bg-main-blue capitalize py-1.5 px-6 rounded-lg text-xs font-normal shadow-none"
                    >
                      Answers
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog
        size="md"
        open={open}
        handler={() => handleOpen()}
        className="p-4 rounded-3xl overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="relative block m-0">
          <Typography variant="h5" color="blue-gray" className="font-bold">
            Results of {selectedTopic?.name} Quiz
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-0 top-0"
            onClick={() => handleOpen()}
          >
            <XMarkIcon className="w-5 h-5 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {selectedTopic?.details?.map((item, index) => (
            <div
              key={index}
              className="p-4 space-y-3 border border-gray-100 rounded-2xl"
            >
              <Typography className="text-sm font-bold text-gray-800">
                {item.q}
              </Typography>
              <div className="space-y-2">
                {item.options.map((option, optIdx) => {
                  const isCorrect = optIdx === item.correct;
                  const isUserAnswer = optIdx === item.user;
                  const isWrong = isUserAnswer && !isCorrect;

                  return (
                    <div
                      key={optIdx}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                        isCorrect
                          ? "bg-green-50 border-green-200"
                          : isWrong
                            ? "bg-red-50 border-red-200"
                            : "bg-blue-50/30 border-blue-100"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isCorrect
                            ? "border-green-500 bg-green-500"
                            : isWrong
                              ? "border-red-500 bg-red-500"
                              : "border-blue-400"
                        }`}
                      >
                        {(isCorrect || isWrong) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <Typography
                        className={`text-xs font-medium ${isCorrect ? "text-green-700" : isWrong ? "text-red-700" : "text-blue-700"}`}
                      >
                        {option}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </DialogBody>
        <div className="flex justify-center p-4">
          <Button
            className="w-full max-w-xs py-3 bg-main-blue rounded-xl"
            onClick={() => handleOpen()}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default HistoryDetails;
