import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  UploadCloud,
  FileText,
  Sparkles,
} from "lucide-react";

import { useDropzone } from "react-dropzone";

import toast from "react-hot-toast";

import API from "../../services/api";


const UploadPage = () => {

  const navigate = useNavigate();

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // Dropzone
  const onDrop = (
    acceptedFiles
  ) => {

    const selectedFile =
      acceptedFiles[0];

    if (selectedFile) {

      setFile(selectedFile);

      toast.success(
        "File selected"
      );

    }
  };


  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [],
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });


  // Upload
  const handleUpload = async () => {

    try {

      if (!file) {

        return toast.error(
          "Please select a file"
        );

      }

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "travelDocument",
        file
      );

      const response =
        await API.post(
          "/itineraries/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      toast.success(
        "AI itinerary generated"
      );

      navigate(
        `/itinerary/${response.data.itinerary._id}`
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data
          ?.message ||
          "Upload failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-slate-800">
            Upload Travel Documents
          </h1>

          <p className="text-slate-500 mt-4 text-lg">
            Upload flight tickets,
            hotel bookings, visas,
            screenshots, or travel PDFs
            to generate an AI-powered
            itinerary.
          </p>

        </div>



        {/* Upload Card */}
        <div className="bg-white rounded-3xl shadow-sm p-10">

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all
      
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 hover:border-blue-400"
            }
          `}
          >

            <input
              {...getInputProps()}
            />


            <div className="flex justify-center mb-6">

              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">

                <UploadCloud
                  size={48}
                  className="text-blue-600"
                />

              </div>

            </div>


            <h2 className="text-3xl font-bold text-slate-800">
              Drag & Drop Files Here
            </h2>

            <p className="text-slate-500 mt-4 text-lg">
              Supports PDF, JPG, PNG,
              JPEG
            </p>


            {file && (

              <div className="mt-8 inline-flex items-center gap-3 bg-slate-100 px-6 py-4 rounded-2xl">

                <FileText className="text-blue-600" />

                <span className="font-medium text-slate-700">
                  {file.name}
                </span>

              </div>

            )}

          </div>



          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">

            <button
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 py-4 rounded-2xl font-semibold transition-all"
            >
              Back to Dashboard
            </button>


            <button
              onClick={
                handleUpload
              }
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              <Sparkles size={18} />

              {loading
                ? "Generating..."
                : "Generate AI Itinerary"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UploadPage;