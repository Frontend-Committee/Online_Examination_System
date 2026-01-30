import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const QuizCard = ({ title, description, bgImage }) => {
  return (
    <Card className="relative w-full h-64 overflow-hidden transition-transform cursor-pointer hover:scale-105 rounded-xl">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 w-full h-full m-0 rounded-none"
      >
        <img
          src={bgImage}
          alt={title}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 w-full h-full bg-black/10" />
      </CardHeader>

      <CardBody className="relative flex flex-col justify-center h-full px-0 pt-40 pb-4">
        <div className="p-4 mx-4 border rounded-lg shadow-lg bg-main-blue backdrop-blur-lg border-white/30">
          <Typography
            variant="h6"
            color="white"
            className="mb-1 font-bold leading-tight"
          >
            {title}
          </Typography>
          <Typography
            variant="small"
            color="white"
            className="font-normal truncate opacity-90"
          >
            {description || "Voluptatem aut ut dignissimos blanditiis"}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default QuizCard;
