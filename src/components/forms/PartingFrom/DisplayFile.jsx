import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
function DisplayFile({ photo, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={URL.createObjectURL(photo.file)}
        alt="Uploaded"
        className="w-20 object-cover rounded-md"
      />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <label htmlFor="Logo" className="p-0 m-0">
            <div
              className=" bg-white rounded-full border-1 border px-2 mx-1 cursor-pointer"
              onClick={onEdit}
            >
              <MdOutlineModeEdit className="color" size={24} />
            </div>
          </label>
          <div
            className=" bg-white rounded-full border-1 border px-2 mx-1 cursor-pointer"
            onClick={onDelete}
          >
            <MdDelete className="color" size={24} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayFile;
