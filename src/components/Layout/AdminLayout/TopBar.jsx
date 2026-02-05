import { CiSearch } from "react-icons/ci";
import { HiMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import LeftBar from "./LeftBar";
import {
  Drawer,
  Dialog,
  DialogBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { addSubject } from "../../../services/subjectService";
import { addExam } from "../../../services/examService";
import toast, { Toaster } from "react-hot-toast";

const TopBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDiploma, setOpenDiploma] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);

  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("Default Description");
  const [selectedFile, setSelectedFile] = useState(null);

  const [examTitle, setExamTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const isDetailsPage = location.pathname.includes("subjects/");
  const subjectId = isDetailsPage ? location.pathname.split("/").pop() : null;

  const handleButtonClick = () => {
    if (isDetailsPage) {
      setOpenQuiz(true);
    } else {
      setOpenDiploma(true);
    }
  };

  const handleAddDiploma = async () => {
    if (!subjectName || !selectedFile) {
      toast.error("Please provide both a name and an icon");
      return;
    }

    const formData = new FormData();
    formData.append("name", subjectName);
    formData.append("icon", selectedFile);

    setLoading(true);
    try {
      await addSubject(formData);
      toast.success("Diploma added successfully!");
      setSubjectName("");
      setSelectedFile(null);
      setOpenDiploma(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add diploma");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExam = async () => {
    if (!examTitle || !duration || !numQuestions) {
      toast.error("Please fill all fields");
      return;
    }

    const payload = {
      title: examTitle,
      duration: parseInt(duration),
      subject: subjectId,
      numberOfQuestions: parseInt(numQuestions),
    };
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      await addExam(payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Exam added successfully!");

      setExamTitle("");
      setDuration("");
      setNumQuestions("");
      setOpenQuiz(false);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      const serverMessage = err.response?.data?.message || "Failed to add exam";
      toast.error(serverMessage);
      console.log("Full Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="flex items-center justify-between w-full p-5 lg:bg-transparent bg-main-blue">
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 99999999,
        }}
      />
      <div className="flex items-center gap-4 px-4 lg:hidden">
        <HiMenuAlt2
          className="w-8 h-8 text-white cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        />
        <CiSearch className="w-6 h-6 text-white" />
      </div>
      <div className="relative flex-1 mx-4 hidden lg:flex items-center max-w-[62em]">
        <CiSearch className="absolute w-5 h-5 text-main-blue left-4" />
        <input
          className="w-full bg-white placeholder:text-Gray text-Gray text-base border-none rounded-2xl py-3 pl-12 pr-4 transition duration-300 focus:outline-none shadow-[0px_4px_20px_rgba(0,0,0,0.05)]"
          placeholder="Search Quiz"
        />
      </div>
      <div className="flex items-center gap-4 px-4 md:gap-6">
        <button
          className="block rounded-xl bg-main-blue text-white py-2 px-6 md:px-8 text-base font-semibold shadow-[0px_4px_15px_rgba(5,12,156,0.3)] text-center hover:scale-105 transition-all active:scale-95"
          type="button"
          onClick={handleButtonClick}
        >
          {isDetailsPage ? "Add Quiz" : "Add Diploma"}
        </button>

        <div className="relative w-10 h-10 border-2 border-white rounded-full md:w-12 md:h-12">
          <img
            src="/assets/images/avatar.jpg"
            alt="avatar"
            className="object-cover w-full h-full rounded-full shadow-inner"
          />
        </div>
      </div>

      <Dialog
        size="md"
        open={openDiploma}
        handler={() => setOpenDiploma(false)}
        className="p-6 rounded-[2rem] outline-none"
      >
        <DialogBody>
          <div className="flex items-center gap-3 mb-10">
            <div
              className="p-1 border-2 rounded-full cursor-pointer border-main-blue"
              onClick={() => setOpenDiploma(false)}
            >
              <ArrowLeftIcon className="h-4 w-4 text-main-blue stroke-[3]" />
            </div>
            <Typography className="text-2xl font-bold text-main-blue">
              Add Diploma
            </Typography>
          </div>
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="flex flex-col">
              <Typography className="mb-2 text-sm font-bold text-gray-500">
                Add Photo
              </Typography>
              <label
                className={`flex items-center justify-center w-12 h-12 border-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedFile
                    ? "border-main-blue bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <PlusIcon
                  className={`w-6 h-6 ${selectedFile ? "text-main-blue" : "text-gray-400"}`}
                />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept="image/*"
                />
              </label>
            </div>
            <div className="flex-1 w-full space-y-4">
              <div>
                <Typography className="mb-2 text-sm font-bold text-gray-500">
                  Diploma Name
                </Typography>
                <Input
                  size="lg"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="!border-gray-300 focus:!border-main-blue rounded-xl"
                  labelProps={{ className: "hidden" }}
                  placeholder="Enter Name"
                />
              </div>
              <div>
                <Typography className="mb-2 text-sm font-bold text-gray-500">
                  Description
                </Typography>
                <Input
                  size="lg"
                  value={description}
                  readOnly
                  className="!border-gray-300 focus:!border-main-blue rounded-xl bg-gray-50"
                  labelProps={{ className: "hidden" }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={() => setOpenDiploma(false)}
              className="px-12 py-2 font-semibold border border-main-blue text-main-blue rounded-xl"
            >
              Back
            </button>
            <button
              onClick={handleAddDiploma}
              disabled={loading}
              className="px-16 py-2 font-bold text-white shadow-lg bg-main-blue rounded-xl disabled:opacity-50"
            >
              {loading ? "Adding..." : "ADD"}
            </button>
          </div>
        </DialogBody>
      </Dialog>

      <Dialog
        size="md"
        open={openQuiz}
        handler={() => setOpenQuiz(false)}
        className="p-6 rounded-[2rem] outline-none"
      >
        <DialogBody>
          <div className="flex items-center gap-3 mb-10">
            <div
              className="p-1 border-2 rounded-full cursor-pointer border-main-blue"
              onClick={() => setOpenQuiz(false)}
            >
              <ArrowLeftIcon className="h-4 w-4 text-main-blue stroke-[3]" />
            </div>
            <Typography className="text-2xl font-bold text-main-blue">
              Add Exam
            </Typography>
          </div>

          <div className="space-y-4">
            <div>
              <Typography className="mb-2 text-sm font-bold text-gray-500">
                Exam Title
              </Typography>
              <Input
                size="lg"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="React Quiz"
                className="!border-gray-300 focus:!border-main-blue rounded-xl"
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography className="mb-2 text-sm font-bold text-gray-500">
                Duration (Minutes)
              </Typography>
              <Input
                type="number"
                size="lg"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="25"
                className="!border-gray-300 focus:!border-main-blue rounded-xl"
                labelProps={{ className: "hidden" }}
              />
            </div>
            <div>
              <Typography className="mb-2 text-sm font-bold text-gray-500">
                Number of Questions
              </Typography>
              <Input
                type="number"
                size="lg"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                placeholder="25"
                className="!border-gray-300 focus:!border-main-blue rounded-xl"
                labelProps={{ className: "hidden" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mt-12">
            <button
              onClick={() => setOpenQuiz(false)}
              className="px-12 py-2 font-semibold border border-main-blue text-main-blue rounded-xl"
            >
              Back
            </button>
            <button
              onClick={handleAddExam}
              disabled={loading}
              className="px-16 py-2 font-bold text-white shadow-lg bg-main-blue rounded-xl disabled:opacity-50"
            >
              {loading ? "Adding..." : "ADD"}
            </button>
          </div>
        </DialogBody>
      </Dialog>

      <Drawer
        placement="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="h-auto p-0"
      >
        <LeftBar isMobile={true} closeDrawer={() => setIsDrawerOpen(false)} />
      </Drawer>
    </nav>
  );
};

export default TopBar;
