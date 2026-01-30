import React from "react";
import { Link } from "react-router-dom";
import QuizCard from "../../components/Layout/QuizCard";
import {
  Dialog,
  Typography,
  DialogBody,
  IconButton,
  DialogHeader,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const mySubjects = [
  {
    id: 1,
    title: "Front-end Web Development",
    img: "/assets/images/1st Dip.jpg",
  },
  { id: 2, title: "Android Development", img: "/assets/images/2nd Dip.jpg" },
  { id: 3, title: "Flutter Development", img: "/assets/images/3rd Dip.jpg" },
  { id: 4, title: "UI & UX Design", img: "/assets/images/4th Dip.jpg" },
  { id: 5, title: "AI & ML Development", img: "/assets/images/5th Dip.jpg" },
  { id: 6, title: "Back-end Development", img: "/assets/images/6th Dip.jpg" },
  { id: 7, title: "Logo", img: "/assets/icons/Final_Logo.png" },
  { id: 8, title: "Logo", img: "/assets/icons/Final_Logo.png" },
  { id: 9, title: "Logo", img: "/assets/icons/Final_Logo.png" },
];

const Subjects = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold text-main-blue">Quizzes</h1>
        <button
          onClick={handleOpen}
          className="mb-6 font-bold cursor-pointer text-main-blue hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mySubjects.slice(0, 6).map((sub) => (
          <Link to={`${sub.id}`} key={sub.id} className="block">
            <QuizCard title={sub.title} bgImage={sub.img} />
          </Link>
        ))}
      </div>

      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="p-4 overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="relative block m-0">
          <Typography variant="h4" color="blue-gray">
            All Diploma Categories
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Browse all our specialized tracks and start your quiz.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="w-5 h-5 stroke-2" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="px-2 pb-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mySubjects.map((sub) => (
              <Link to={`${sub.id}`} key={sub.id} className="block">
                <QuizCard title={sub.title} bgImage={sub.img} />
              </Link>
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default Subjects;
