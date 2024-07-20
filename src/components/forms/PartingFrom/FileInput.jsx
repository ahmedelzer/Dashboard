import React, { useState } from "react";
import DisplayFile from "./DisplayFile";

function FileInput({ label }) {
  const [Files, setFiles] = useState([]);
  const [editFileIndex, setEditFileIndex] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      addFile(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (editFileIndex !== null) {
      updateFile(editFileIndex, file);
    } else {
      addFile(file);
    }
  };

  const addFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64Data = reader.result;
      const [, base64String] = base64Data.split(";base64,");
      setFiles((prevFiles) => [
        ...prevFiles,
        { file: file, base64: base64String, id: prevFiles.length },
      ]);
    };
  };

  const updateFile = (index, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64Data = reader.result;
      const [, base64String] = base64Data.split(";base64,");
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = {
          file: file,
          base64: base64String,
          id: newFiles[index].id,
        };
        return newFiles;
      });
      setEditFileIndex(null);
    };
  };

  const handleEdit = (index) => {
    setEditFileIndex(index);
  };

  const handleDelete = (index) => {
    setFiles(Files.filter((file, i) => i !== index));
  };

  console.log(Files);

  return (
    <div>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 !text-primary"
      >
        {label}
      </label>

      <div className="flex items-center justify-center w-full">
        <div
          className="flex flex-col h-64 border-color items-center justify-center w-full border-2 border-dashed rounded-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-row items-center justify-evenly w-[50%] my-4">
            {Files.map((photo, i) => (
              <DisplayFile
                key={photo.id}
                photo={photo}
                onEdit={() => handleEdit(i)}
                onDelete={() => handleDelete(i)}
              />
            ))}
          </div>
          <label htmlFor="Logo" className="cursor-pointer w-[100%]">
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>

            <input
              onChange={handleImage}
              id="Logo"
              name="Logo"
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default FileInput;
