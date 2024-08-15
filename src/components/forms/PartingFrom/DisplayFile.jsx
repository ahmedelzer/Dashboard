import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
function DisplayFile({ photo, onEdit, onDelete, actions }) {
  //todo make actions work and photo work with file and src
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        // src={photo}
        src={URL.createObjectURL(photo.file)}
        alt="Uploaded"
        className="w-full object-cover rounded-md"
      />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {actions?.map((action, index) => (
            <label key={index} htmlFor="" className="p-0 m-0">
              <div
                className="bg-white rounded-full border-1 border px-2 mx-1 cursor-pointer"
                onClick={action.actionHandler}
              >
                {action.icon}
              </div>
            </label>
          ))}

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
        </div>
      )}
    </div>
  );
}

export default DisplayFile;
