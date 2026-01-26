import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Progress,
} from "@material-tailwind/react";
import { FaFlag, FaClock, FaCheckCircle } from "react-icons/fa";

const userDataMock = {
  name: "Ahmed Mohamed",
  title: "Voluptatem aut",
  avatar: "/assets/images/avatar.jpg",
  progress: 75,
  stats: {
    quizPassed: 27,
    fastestTime: "13 min",
    correctAnswers: 200,
  },
};

const ProfileCard = ({ data = userDataMock }) => {
  return (
    <Card className="flex-col md:flex-row w-full max-w-[75rem] p-5 items-center shadow-sm border border-gray-100 gap-4">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-full m-0 rounded-lg shrink-0 md:w-40"
      >
        <img
          src={data.avatar}
          alt={data.name}
          className="object-cover w-full h-64 rounded-lg md:h-40 md:w-40"
        />
      </CardHeader>

      <CardBody className="w-full p-0 md:py-0">
        <div className="text-center md:text-left">
          <Typography
            variant="h4"
            color="blue"
            className="mb-1 font-bold text-main-blue"
          >
            {data.name}
          </Typography>
          <Typography
            color="gray"
            className="mb-4 text-sm font-normal opacity-70"
          >
            {data.title}
          </Typography>
        </div>

        <div className="w-full mb-6">
          <Progress
            value={data.progress}
            size="sm"
            color="blue"
            className="bg-blue-50"
          />
        </div>

        <div className="flex flex-row items-center justify-between gap-2 md:gap-4">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
            <div className="p-3 bg-white shadow-md rounded-xl">
              <FaFlag className="w-5 h-5 text-main-blue" />
            </div>
            <div className="text-center md:text-left">
              <Typography className="text-lg font-bold text-gray-700 md:text-xl">
                {data.stats.quizPassed}
              </Typography>
              <Typography className="text-[10px] md:text-xs font-medium text-gray-500">
                Quiz Passed
              </Typography>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
            <div className="p-3 bg-white shadow-md rounded-xl">
              <FaClock className="w-5 h-5 text-main-blue" />
            </div>
            <div className="text-center md:text-left">
              <Typography className="text-lg font-bold text-gray-700 md:text-xl">
                {data.stats.fastestTime}
              </Typography>
              <Typography className="text-[10px] md:text-xs font-medium text-gray-500">
                Fastest Time
              </Typography>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
            <div className="p-3 bg-white shadow-md rounded-xl">
              <FaCheckCircle className="w-5 h-5 text-main-blue" />
            </div>
            <div className="text-center md:text-left">
              <Typography className="text-lg font-bold text-gray-700 md:text-xl">
                {data.stats.correctAnswers}
              </Typography>
              <Typography className="text-[10px] md:text-xs font-medium text-gray-500">
                Correct Answers
              </Typography>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
