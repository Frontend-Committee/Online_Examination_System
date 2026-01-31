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
import { getExamById, checkQuestions } from "../../services/examService";
import toast from "react-hot-toast";

const TakeExam = ({ topicData }) => {
  const [open, setOpen] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showScore, setShowScore] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      if (open && topicData?._id) {
        try {
          setLoading(true);
          const res = await getExamById(topicData._id);
          if (res.data && res.data.exam) {
            setQuestions(res.data.exam.questions || []);
            setTimeLeft(topicData.duration * 60);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchExamData();
  }, [open, topicData]);

  useEffect(() => {
    let timer;
    if (isQuizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isQuizStarted) {
      handleFinish();
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
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    if (topicData) setTimeLeft(topicData.duration * 60);
  };

  const handleOptionChange = (questionId, answerKey) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerKey,
    }));
  };

  const handleFinish = async () => {
    const answersArray = Object.keys(userAnswers).map((qId) => ({
      questionId: qId,
      correct: userAnswers[qId],
    }));

    const payload = {
      answers: answersArray,
      time: Math.floor((topicData.duration * 60 - timeLeft) / 60),
    };

    try {
      setLoading(true);
      const res = await checkQuestions(payload);

      setResultData(res.data);
      setIsQuizStarted(false);
      setShowScore(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setIsQuizStarted(false);
    }
  };
  const successRate =
    questions.length > 0
      ? Math.round((resultData?.correctAnswers / questions.length) * 100)
      : 0;

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
        {loading ? (
          <div className="p-10 font-bold text-center text-main-blue">
            Processing...
          </div>
        ) : showScore ? (
          <div className="p-6 text-center">
            <Typography
              variant="h5"
              className="mb-8 font-bold text-left text-blue-gray-900"
            >
              Your score
            </Typography>

            <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
              <div
                className="relative flex items-center justify-center w-32 h-32 rounded-full shadow-lg"
                style={{
                  background: `conic-gradient(
        #1e40af  ${successRate}%, 
        #ef4444 ${successRate}% 100%
      )`,
                }}
              >
                <div className="absolute flex items-center justify-center w-32 h-32 bg-white rounded-full">
                  <Typography variant="h4" className="font-bold text-gray-800">
                    {successRate}%
                  </Typography>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-10">
                  <Typography className="text-xl font-bold text-blue-800">
                    Correct
                  </Typography>
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-700 border border-blue-600 rounded-full">
                    {resultData?.correctAnswers}
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <Typography className="text-xl font-bold text-red-500">
                    Incorrect
                  </Typography>
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-red-500 border border-red-500 rounded-full">
                    {resultData?.wrongAnswers}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <Button
                variant="outlined"
                className="flex-1 py-3 text-blue-600 border-blue-600 rounded-2xl"
                onClick={handleOpen}
              >
                Back
              </Button>
              <Button className="flex-1 py-3 bg-blue-600 rounded-2xl">
                Show results
              </Button>
            </div>
          </div>
        ) : !isQuizStarted ? (
          <>
            <DialogHeader className="font-bold text-blue-gray-900">
              Instructions
            </DialogHeader>
            <DialogBody>
              <Typography className="mb-4 font-bold text-blue-gray-800">
                Topic: {topicData?.title}
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
                className={`flex items-center gap-1 font-bold transition-colors duration-300 ${timeLeft < 60 ? "text-red-500" : "text-green-500"}`}
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
                {questions[currentQuestionIndex]?.answers?.map(
                  (option, index) => (
                    <label
                      key={`${currentQuestionIndex}-${index}`}
                      className="flex items-center p-1 transition-all border border-gray-100 cursor-pointer bg-gray-50/50 rounded-xl hover:bg-gray-100"
                    >
                      <Radio
                        name={`quiz-options-${currentQuestionIndex}`}
                        checked={
                          userAnswers[questions[currentQuestionIndex]._id] ===
                          option.key
                        }
                        onChange={() =>
                          handleOptionChange(
                            questions[currentQuestionIndex]._id,
                            option.key,
                          )
                        }
                        label={
                          <span className="font-medium text-gray-800">
                            {option.answer}
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
