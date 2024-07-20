import React, { useCallback, useRef, useState } from "react";
import { Modal, FormCheck } from "react-bootstrap";
import Webcam from "react-webcam";
import { FormGroup, Button, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TextBox from "devextreme-react/text-box";
export default function FieldGroup({
  label,
  Title,
  data,
  value,
  editedRow,
  onChange,
  setTital,
  dataError,
  ...props
}) {
  const [base64, setbase64] = useState({});
  const [error, seterror] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("file");
  const [img, setimg] = useState(null);
  console.log("editedRow finsh", editedRow);
  const errorMessages = dataError?.error?.errors?.DashboardCategoryName;
  const style = () => {
    if (errorMessages) {
      return "is-invalid";
    } else {
      return "";
    }
  };
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event);
  };
  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  const [imageUrl, setImageUrl] = useState("");
  const fetchImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      setimg(blob);
      if (img) {
        reader.readAsDataURL(img);
        reader.onload = () => {
          const base64Data = reader.result; // Extract base64 string from result
          setbase64(base64Data);
        };
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      seterror(error);
    }
  };

  function optionsImage(option, id, title) {
    return (
      <div
        onChange={handleOptionChange}
        className={`cursor-pointer rounded-none border border-gray-300 px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 ${
          selectedOption === option ? "bg text-white" : ""
        }`}
      >
        <input
          type="radio"
          id={id}
          className="appearance-none"
          onChange={handleOptionChange}
        />
        <label title={title} for={id} className="form-check-label">
          {title}
        </label>
      </div>
    );
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    handleOptionChange(option);
    setIsOpen(false);
  };
  return (
    <FormGroup>
      <Label>{label}</Label>
      {data.parameterType === "image" ? (
        <div className=" ">
          <div className="relative m-auto w-[70%] mb-2">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={toggleDropdown}
              >
                Select Option
                {/* Add icon here if needed */}
              </button>
            </div>

            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <div
                    role="none"
                    className={`${
                      selectedOption === "file"
                        ? "bg text-white"
                        : "text-gray-900"
                    } block px-4 py-2 text-sm cursor-pointer hover:underline`}
                    onClick={() => handleOptionClick("file")}
                  >
                    Upload Image
                  </div>
                  <div
                    role="none"
                    className={`${
                      selectedOption === "camera"
                        ? "bg text-white"
                        : "text-gray-900"
                    } block px-4 py-2 text-sm cursor-pointer hover:underline`}
                    onClick={() => handleOptionClick("camera")}
                  >
                    Capture Image
                  </div>
                  <div
                    role="none"
                    className={`${
                      selectedOption === "url"
                        ? "bg text-white"
                        : "text-gray-900"
                    } block px-4 py-2 text-sm cursor-pointer hover:underline`}
                    onClick={() => handleOptionClick("url")}
                  >
                    Enter Image URL
                  </div>
                </div>
              </div>
            )}
          </div>
          {selectedOption === "file" ? (
            <div>
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  className="cursor-pointer mb-2"
                  alt=""
                  onClick={openImageModal}
                />
              ) : null}
              <div>
                <input
                  {...props}
                  type="file"
                  // onChange={handleImageChange}
                  onChange={(e) =>
                    onChange(
                      e,
                      selectedOption,
                      base64,
                      setimg,
                      setbase64,
                      setImageUrl,
                      seterror
                    )
                  }
                  accept="image/*"
                  className={`${style()} form-control`}
                />
              </div>
            </div>
          ) : null}
          {selectedOption === "camera" ? (
            <div>
              <div className="flex justify-between items-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ width: "45%", height: "auto" }}
                />
                {capturedImage && (
                  <div>
                    <img
                      src={capturedImage}
                      alt="Captured"
                      className=" cursor-pointer"
                      onClick={openImageModal}
                    />
                  </div>
                )}
              </div>
              <Button
                onClick={(e) =>
                  onChange(
                    e,
                    selectedOption,
                    base64,
                    setimg,
                    setbase64,
                    setImageUrl,
                    seterror,
                    webcamRef,
                    setCapturedImage
                  )
                }
                {...props}
                className="pop mt-2 text-center"
              >
                Capture Image
              </Button>
            </div>
          ) : null}

          {selectedOption === "url" && (
            <div>
              <input
                type="text"
                placeholder="Enter image URL"
                onChange={handleUrlChange}
                value={imageUrl}
                className="form-control"
              />
              {img ? (
                <img
                  src={URL.createObjectURL(img)}
                  className={`cursor-pointer my-2 transition-opacity duration-500 ease-in-out hover:opacity-100 ${
                    img ? "opacity-100" : "opacity-0"
                  }`}
                  alt=""
                  onClick={openImageModal}
                />
              ) : null}

              <Button
                {...props}
                onClick={(e) =>
                  onChange(
                    e,
                    selectedOption,
                    base64,
                    setimg,
                    setbase64,
                    imageUrl,
                    seterror,
                    webcamRef,
                    setCapturedImage
                  )
                }
                // onClick={fetchImage}
                title={error === false ? "" : error}
                className={`${
                  error === false
                    ? ""
                    : "!border-4 !border-red-600 !outline-none"
                } pop mt-2 text-center`}
              >
                Fetch Image
              </Button>
            </div>
          )}
          {img ? (
            <Modal show={isImageModalOpen} onHide={closeImageModal} size="lg">
              <Modal.Body>
                <img
                  src={URL.createObjectURL(img)}
                  className="img-fluid"
                  alt=""
                />
              </Modal.Body>
              <Modal.Footer>
                {/* Add zooming controls here if needed */}
              </Modal.Footer>
            </Modal>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          <input
            {...props}
            value={value}
            onChange={onChange}
            className={`${style()} form-control`}
          />
        </>
      )}
      {/* {error && } */}
    </FormGroup>
  );
}
