import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { HiChevronUp } from "react-icons/hi";
function PartionFrom({ Header, Popup, Table }) {
  const [open, setopen] = useState(false);
  const [Edit, setEdit] = useState(false);
  return (
    <div className="my-4">
      <div
        className="my-1 p-1 border-2 border-[#d5e0d5] roun
        ded-lg transition-all duration-300"
      >
        <div
          onClick={() => setopen(!open)}
          className="flex cursor-pointer container flex-row 
          justify-between items-center "
        >
          <h2 className=" font-bold text-[22px]">{Header}</h2>
          <div className=" hover:border-black hover:border">
            {open ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
          </div>
        </div>
        <form class={open ? `w-full max-w-lg m-auto` : "hidden"}>
          <div>{Table}</div>
          <div className="flex justify-end">
            <p
              className={`${
                Edit ? " inline" : "hidden"
              } color  font-bold cursor-pointer`}
              onClick={() => setEdit(false)}
            >
              Cancel
            </p>
            <p
              className=" color font-bold px-2 cursor-pointer"
              onClick={() => setEdit(!Edit)}
            >
              {Edit ? "Save" : "Edit"}
            </p>
          </div>
          <div className={Edit ? "cursor-auto" : "pointer-events-none"}>
            {Popup}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartionFrom;
