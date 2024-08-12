import React, { useState, useRef, useEffect, useCallback } from "react";
import { DropDownBox } from "devextreme-react/drop-down-box";
import { List } from "devextreme-react/list";
import { FormGroup } from "reactstrap";
const CustomDropdown = ({
  returnField,
  panelContent,
  onChange,
  displayField,
  setPanelOpen,
  isPanelOpen,
  ...props
}) => {
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  //make it work for onchange in two cases
  const handleTogglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setPanelOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown panel
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (inputRef.current) {
      onChange({ target: { name: inputRef.current.name, value: returnField } });
    }
  }, [returnField, onChange]);
  return (
    <FormGroup className=" flex justify-between form-control">
      <input
        name={props.fieldName}
        readOnly
        ref={inputRef}
        value={displayField}
        placeholder={displayField}
        className="form-control w-[96%]"
      />

      <div
        className=" cursor-pointer  flex justify-center items-center"
        onClick={handleTogglePanel}
      >
        {/* <span>{buttonText}</span> */}
        <span style={{ marginLeft: "5px" }}>{isPanelOpen ? "▲" : "▼"}</span>
      </div>

      {isPanelOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            border: "1px solid #ccc",
            background: "#fff",
            zIndex: 1,
            marginTop: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {panelContent}
        </div>
      )}
      {/* <div ref={dropdownRef} style={{ position: "relative" }}>
        <label>{displayField}</label>

      </div> */}
    </FormGroup>
    // <DropDownBox
    //   dataSource={dataSource}
    //   value={selectedFruit}
    //   ref={dropDownBoxRef}
    //   onValueChanged={onValueChanged}
    //   acceptCustomValue={true}
    //   openOnFieldClick={false}
    //   onEnterKey={addItem}
    //   label="Fruits"
    //   labelMode="floating"
    // >
    //   <List
    //     ref={listRef}
    //     dataSource={dataSource}
    //     allowItemDeleting={true}
    //     selectionMode="single"
    //     onSelectionChanged={changeDropDownBoxValue}
    //     onItemDeleting={onItemDeleting}
    //   />
    // </DropDownBox>
  );
};

export default CustomDropdown;
