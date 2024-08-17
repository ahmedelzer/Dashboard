import React, { useState } from "react";
import { CheckBox } from "devextreme-react/check-box"; // Import DevExtreme CheckBox
import { ImageParameterWithPanelActions } from "../../inputs";
import { MdDelete } from "react-icons/md";
function FileInput({ schema, row, ...props }) {
  const [Files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      [...files].forEach((file) => {
        addFile(file);
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    addFile(file);
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

  const handleCheckboxChange = (index) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((i) => i !== index));
    setSelectedFiles((prevSelected) => prevSelected.filter((i) => i !== index));
  };
  console.log(Files, selectedFiles);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Files.map((photo, i) => (
          <div key={i} className="relative border p-2 rounded">
            <div className="flex justify-between items-center">
              <CheckBox
                value={selectedFiles.includes(photo)}
                onValueChanged={() => handleCheckboxChange(photo)}
              />
              <MdDelete
                onClick={() => handleDelete(photo)}
                className="cursor-pointer text-red-500"
                size={24}
              />
            </div>
            <ImageParameterWithPanelActions
              fieldName={"image"}
              title={"Image"}
              value={URL.createObjectURL(photo.file)}
              enable={true}
              onChange={() => {}}
            />
          </div>
        ))}
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
          <label htmlFor="Logo" className="cursor-pointer w-[100%]">
            <img src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg" />
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
