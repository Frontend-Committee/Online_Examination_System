import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";

const TakeExam = ({ topicData }) => {
  const [open, setOpen] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (topicData) {
      const allMockData = {
        HTML: [
          {
            id: 1,
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "Home Tool Markup Language",
              "Hyperlinks and Text Markup Language",
              "Hyper Tool Markup Language",
            ],
          },
          {
            id: 2,
            question: "Who is making the Web standards?",
            options: [
              "Google",
              "The World Wide Web Consortium",
              "Microsoft",
              "Mozilla",
            ],
          },
        ],
        Css: [
          {
            id: 1,
            question: "What does CSS stand for?",
            options: [
              "Creative Style Sheets",
              "Cascading Style Sheets",
              "Computer Style Sheets",
              "Colorful Style Sheets",
            ],
          },
          {
            id: 2,
            question:
              "Where in an HTML document is the correct place to refer to an external style sheet?",
            options: [
              "In the <body> section",
              "In the <head> section",
              "At the end of the document",
              "In the <meta> section",
            ],
          },
        ],
      };
      setQuestions(allMockData[topicData.name] || []);
      setTimeLeft(topicData.duration * 60);
    }
  }, [topicData]);

  useEffect(() => {
    let timer;
    if (isQuizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isQuizStarted) {
      handleOpen();
    }
    return () => clearInterval(timer);
  }, [isQuizStarted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOpen = () => {
    setOpen(!open);
    setIsQuizStarted(false);
    setCurrentQuestionIndex(0);
    if (topicData) setTimeLeft(topicData.duration * 60);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleOpen();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setIsQuizStarted(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        size="sm"
        className="px-8 capitalize rounded-lg bg-main-blue"
      >
        Start
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="p-4 rounded-2xl"
      >
        {!isQuizStarted ? (
          <>
            <DialogHeader className="font-bold text-blue-gray-900">
              Instructions
            </DialogHeader>
            <DialogBody>
              <Typography className="mb-4 font-bold text-blue-gray-800">
                Topic: {topicData?.name}
              </Typography>
              <ul className="space-y-2 font-medium text-gray-700 list-disc list-inside">
                <li>Total Questions: {questions.length}</li>
                <li>Duration: {topicData?.duration} Minutes</li>
                <li>Keep a stable connection during the test.</li>
              </ul>
            </DialogBody>
            <DialogFooter className="justify-center pt-8">
              <Button
                className="w-full py-3 text-lg capitalize shadow-lg rounded-xl bg-main-blue shadow-blue-200"
                onClick={() => setIsQuizStarted(true)}
              >
                Start
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="flex items-center justify-between pb-2">
              <Typography className="font-bold text-main-blue">
                Question {currentQuestionIndex + 1}
              </Typography>
              <div
                className={`flex items-center gap-1 font-bold transition-colors duration-300 ${timeLeft < 300 ? "text-red-500" : "text-green-500"}`}
              >
                <ClockIcon className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </DialogHeader>

            <div className="flex justify-center gap-2 px-4 mb-4">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${i <= currentQuestionIndex ? "bg-main-blue w-6" : "bg-gray-200"}`}
                />
              ))}
            </div>

            <DialogBody className="space-y-6">
              <Typography
                variant="h5"
                className="font-bold leading-snug text-blue-gray-900"
              >
                {questions[currentQuestionIndex]?.question}
              </Typography>
              <div className="flex flex-col gap-4">
                {questions[currentQuestionIndex]?.options.map(
                  (option, index) => (
                    <label
                      key={`${currentQuestionIndex}-${index}`}
                      className="flex items-center p-1 transition-all border border-gray-100 cursor-pointer bg-gray-50/50 rounded-xl hover:bg-gray-100"
                    >
                      <Radio
                        name={`quiz-options-${currentQuestionIndex}`}
                        label={
                          <span className="font-medium text-gray-800">
                            {option}
                          </span>
                        }
                        color="blue"
                        containerProps={{ className: "p-3" }}
                      />
                    </label>
                  ),
                )}
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-between gap-4 pt-10">
              <Button
                variant="outlined"
                className="flex-1 py-3 font-bold capitalize rounded-full border-main-blue text-main-blue"
                onClick={handleBack}
              >
                {currentQuestionIndex === 0 ? "Exit" : "Back"}
              </Button>
              <Button
                className="flex-1 py-3 font-bold text-white capitalize rounded-full shadow-none bg-main-blue"
                onClick={handleNext}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
};

export default TakeExam;
