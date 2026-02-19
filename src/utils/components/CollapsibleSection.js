import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg shadow-sm bg-bg">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer p-3 bg-bg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-md font-semibold text-text">{title}</p>

        <span className="text-text">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {/* Content */}
      {isOpen && <div className="p-3 text-text border-t">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
