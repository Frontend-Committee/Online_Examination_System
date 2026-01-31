import React, { useState, useEffect } from "react";
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
import { getUserHistory } from "../../services/historyService";

const HistoryDetails = () => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleOpen = (item = null) => {
    setSelectedHistory(item);
    setOpen(!open);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await getUserHistory();
        if (res.data && res.data.history) {
          setHistoryList(res.data.history);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="p-10 font-bold text-center text-Gray">
        Loading History...
      </div>
    );

  return (
    <div className="w-full space-y-6">
      <div className="pb-10 space-y-4">
        <Typography
          variant="h6"
          className="ml-2 font-bold tracking-wider uppercase text-main-blue"
        >
          Your Learning History
        </Typography>

        <div className="space-y-4">
          {historyList.length > 0 ? (
            historyList.map((item) => (
              <Card
                key={item._id}
                className="flex flex-row items-center justify-between p-4 bg-white border shadow-sm border-gray-50 rounded-2xl"
              >
                <div className="flex items-center gap-5">
                  <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-xl bg-gray-50">
                    <img
                      src="/assets/icons/Logo.png"
                      alt={item.exam?.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <Typography variant="h6" className="font-bold text-Gray">
                      {item.exam?.title}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-medium text-gray-500"
                    >
                      Score: {item.correctAnswers} / {item.totalQuestions}
                    </Typography>
                    
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Typography
                    variant="small"
                    className="mr-2 font-semibold text-gray-700"
                  >
                   in time: {item.time} min
                  </Typography>
                  <Button
                    onClick={() => handleOpen(item)}
                    size="sm"
                    className="bg-main-blue capitalize py-1.5 px-6 rounded-lg text-xs font-normal shadow-none"
                  >
                    Details
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500">
              No history found.
            </div>
          )}
        </div>
      </div>

      <Dialog
        size="md"
        open={open}
        handler={() => handleOpen()}
        className="p-4 rounded-3xl overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="relative block m-0">
          <Typography variant="h5" color="blue-gray" className="font-bold">
            Quiz Details: {selectedHistory?.exam?.title}
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
          {selectedHistory?.questions?.map((item, index) => (
            <div
              key={index}
              className="p-4 space-y-3 border border-gray-100 rounded-2xl"
            >
              <Typography className="text-sm font-bold text-gray-800">
                {item.question?.question}
              </Typography>
              <div className="space-y-2">
                {item.question?.answers?.map((option, optIdx) => {
                  const isCorrect = option.key === item.question?.correct;
                  const isUserAnswer = option.key === item.userAnswer;
                  const isWrong = isUserAnswer && !isCorrect;

                  return (
                    <div
                      key={optIdx}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                        isCorrect
                          ? "bg-green-50 border-green-200"
                          : isWrong
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50/30 border-gray-100"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isCorrect
                            ? "border-green-500 bg-green-500"
                            : isWrong
                              ? "border-red-500 bg-red-500"
                              : "border-gray-400"
                        }`}
                      >
                        {(isCorrect || isWrong) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <Typography
                        className={`text-xs font-medium ${isCorrect ? "text-green-700" : isWrong ? "text-red-700" : "text-gray-600"}`}
                      >
                        {option.answer}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default HistoryDetails;
