import React, { useEffect, useRef } from "react";
import { FormGroup } from "reactstrap";
import { customDropdownStyle } from "./styles";
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
    <FormGroup className={customDropdownStyle.formGroup}>
      <input
        name={props.lookupDisplayField}
        className={`${props.className} ${customDropdownStyle.inputField}`}
        readOnly
        ref={inputRef}
        value={displayField}
        placeholder={displayField}
        // title={props.title}
      />
      <input type="hidden" name={props.fieldName} value={returnField} />
      <div
        className={customDropdownStyle.togglePanelButton}
        onClick={handleTogglePanel}
      >
        <span className={customDropdownStyle.span}>
          {isPanelOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* {isPanelOpen && ( */}
      <div
        className={
          customDropdownStyle.panelContent +
          ` ${isPanelOpen ? "block" : "hidden"}`
        }
      >
        {panelContent}
      </div>
      {/* )} */}
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
