import React from "react";

function TypeFile({ file, title, type = false }) {
  let fileUrl = type ? file : URL.createObjectURL(file);
  const typeFile = type ? type : file.type;
  if (typeFile.startsWith("image")) {
    return <img src={fileUrl} alt={title} className="w-full h-auto" />;
  } else if (typeFile.startsWith("video")) {
    return (
      <video controls className="w-full h-auto" autoPlay>
        <source src={fileUrl} type={typeFile} />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return <div>Unsupported file type</div>;
  }
}

export default TypeFile;
