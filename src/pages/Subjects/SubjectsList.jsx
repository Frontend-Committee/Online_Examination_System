import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../../components/Layout/QuizCard";
import {
  Dialog,
  Typography,
  DialogBody,
  IconButton,
  DialogHeader,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../Context/AuthContext";
import {
  getSubjects,
  deleteSubject,
  updateSubject,
} from "../../services/subjectService";
import toast, { Toaster } from "react-hot-toast";

const Subjects = () => {
  const { state } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);

  const [openDiploma, setOpenDiploma] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("Default Description");
  const [selectedFile, setSelectedFile] = useState(null);
  const [oldIcon, setOldIcon] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const toggleDeleteDialog = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);

  useEffect(() => {
    if (state.token) {
      fetchSubjects();
    }
  }, [state.token]);

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      if (res.data && res.data.subjects) {
        setSubjects(res.data.subjects);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditOpen = (e, sub) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(true);
    setSelectedId(sub._id);
    setSubjectName(sub.name);
    setOldIcon(sub.icon);
    setSelectedFile(null);
    setDescription("Default Description");
    setOpenDiploma(true);
  };

  const handleAction = async () => {
    if (!subjectName) return toast.error("Please enter a name");

    const formData = new FormData();
    formData.append("name", subjectName);
    if (selectedFile) formData.append("icon", selectedFile);

    setLoading(true);
    try {
      if (isEdit) {
        await updateSubject(selectedId, formData);
        toast.success("Diploma updated successfully");
      }
      setOpenDiploma(false);
      setIsEdit(false);
      setSubjectName("");
      setSelectedFile(null);
      setOldIcon("");
      fetchSubjects();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteId(id);
    toggleDeleteDialog();
  };

  const handleFinalDelete = async () => {
    try {
      await deleteSubject(deleteId);
      setSubjects((prev) => prev.filter((sub) => sub._id !== deleteId));
      toast.success("Diploma deleted successfully");
      toggleDeleteDialog();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete diploma");
    }
  };

  return (
    <div className="w-full">
      <Toaster position="top-center" containerStyle={{ zIndex: 999999 }} />

      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-bold text-main-blue">Quizzes</h1>
        <button
          onClick={handleOpen}
          className="mb-6 font-bold text-main-blue hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects?.slice(0, 6).map((sub) => (
          <div key={sub._id} className="relative group">
            <Link to={`${sub._id}`} className="block">
              <QuizCard
                title={sub.name}
                bgImage={sub.icon || "/assets/icons/Logo.png"}
              />
            </Link>
            <div className="!absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconButton
                size="sm"
                className="text-blue-600 bg-white/80"
                onClick={(e) => handleEditOpen(e, sub)}
              >
                <PencilSquareIcon className="w-4 h-4" />
              </IconButton>
              <IconButton
                size="sm"
                className="text-red-600 bg-white/80"
                onClick={(e) => confirmDelete(e, sub._id)}
              >
                <TrashIcon className="w-4 h-4" />
              </IconButton>
            </div>
          </div>
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
            {subjects?.map((sub) => (
              <div key={sub._id} className="relative group">
                <Link to={`${sub._id}`} className="block">
                  <QuizCard
                    title={sub.name}
                    bgImage={sub.icon || "/assets/icons/Logo.png"}
                  />
                </Link>
                <div className="!absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconButton
                    size="sm"
                    className="text-blue-600 bg-white/80"
                    onClick={(e) => handleEditOpen(e, sub)}
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </IconButton>
                  <IconButton
                    size="sm"
                    className="text-red-600 bg-white/80"
                    onClick={(e) => confirmDelete(e, sub._id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>

      <Dialog
        size="md"
        open={openDiploma}
        handler={() => {
          setOpenDiploma(false);
          setIsEdit(false);
        }}
        dismiss={{ outsidePress: false }}
        className="p-6 rounded-[2rem] outline-none z-[10001]"
        style={{ zIndex: 10001 }}
      >
        <DialogBody>
          <div className="flex items-center gap-3 mb-10">
            <div
              className="p-1 border-2 rounded-full cursor-pointer border-main-blue"
              onClick={() => {
                setOpenDiploma(false);
                setIsEdit(false);
              }}
            >
              <ArrowLeftIcon className="h-4 w-4 text-main-blue stroke-[3]" />
            </div>
            <Typography className="text-2xl font-bold text-main-blue">
              {isEdit ? "Update Diploma" : "Add Diploma"}
            </Typography>
          </div>
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="flex flex-col">
              <Typography className="mb-2 text-sm font-bold text-gray-500">
                Photo
              </Typography>
              <label
                className={`relative flex items-center justify-center w-16 h-16 border-2 rounded-full cursor-pointer overflow-hidden transition-all ${
                  selectedFile || oldIcon
                    ? "border-main-blue bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                ) : oldIcon ? (
                  <img
                    src={oldIcon}
                    alt="old"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <PlusIcon className="w-6 h-6 text-gray-400" />
                )}
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
              onClick={() => {
                setOpenDiploma(false);
                setIsEdit(false);
              }}
              className="px-12 py-2 font-semibold border border-main-blue text-main-blue rounded-xl"
            >
              Back
            </button>
            <button
              onClick={handleAction}
              disabled={loading}
              className="px-16 py-2 font-bold text-white shadow-lg bg-main-blue rounded-xl disabled:opacity-50"
            >
              {loading ? "..." : isEdit ? "UPDATE" : "ADD"}
            </button>
          </div>
        </DialogBody>
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        handler={toggleDeleteDialog}
        size="xs"
        dismiss={{ outsidePress: false }}
        className="p-4 rounded-3xl z-[10002]"
        style={{ zIndex: 10002 }}
      >
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-red-50">
            <ExclamationTriangleIcon className="w-10 h-10 text-red-600" />
          </div>
          <Typography variant="h5" color="blue-gray">
            Are you sure?
          </Typography>
        </DialogHeader>
        <DialogBody className="font-normal text-center text-gray-600">
          You are about to delete this diploma.
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <Button
            variant="outlined"
            color="blue-gray"
            onClick={toggleDeleteDialog}
            className="px-8 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleFinalDelete}
            className="px-8 bg-red-600 rounded-xl"
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Subjects;
