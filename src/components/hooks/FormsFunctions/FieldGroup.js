import React, { useCallback, useRef, useState } from "react";
import { Modal, Button, FormCheck } from "react-bootstrap";
import Webcam from "react-webcam";
import { FormGroup, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FieldGroup({
  label,
  Title,
  data,
  focus,
  value,
  editedRow,
  setTital,
  setfocus,
  ...props
}) {
  // const [base64, setbase64] = useState({});
  let base64 = {};
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("file");
  const [img, setimg] = useState("");
  // const base64Data
  const handleChange = (event) => {
    setfocus(true);
  };
  const handleImageChange = (event) => {
    setimg(event.target.files[0]);
    if (img) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        const base64Data = reader.result; // Extract base64 string from result
        base64 = { [data.parameterField]: base64Data };
        console.log("base64", 1);
        editedRow = { ...editedRow, ...base64 };
        console.log("editedRow  render", editedRow);
      };
      console.log("editedRow after render", base64);
    }
  };
  console.log(editedRow);
  const style = () => {
    if (Title !== data.parameterTitel && focus === false) {
      return " focus:shadow-[0_0_0_0.2rem_red] focus:border-red-900";
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
    setSelectedOption(event.target.value);
  };
  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };
  const [imageUrl, setImageUrl] = useState("");
  const fetchImage = async () => {
    // const res = await fetch(imageUrl);
    // const blob = await res.blob();
    // // Gets URL data and read to blob

    // console.log(blob);

    // const mime = blob.type;
    // const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);
    // // Gets blob MIME type (e.g. image/png) and extracts extension

    // const file = new File([blob], `filename.${ext}`, {
    //   type: mime,
    // });
    // console.log(file);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      setimg(blob);
      if (img) {
        reader.readAsDataURL(img);
        reader.onloadend = () => {
          const base64Data = reader.result; // Extract base64 string from result
          base64 = { [data.parameterField]: base64Data };
          console.log("base64", base64);
        };
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    // Convert the captured image to base64
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const base64Data = canvas.toDataURL("image/jpeg");
      console.log("Base64 Image:", base64Data);
    };
  };
  return (
    <FormGroup>
      <Label>{label}</Label>
      {data.parameterType === "image" ? (
        <div>
          <FormCheck
            type="radio"
            id="uploadOption"
            label="Upload Image"
            value="file"
            checked={selectedOption === "file"}
            onChange={handleOptionChange}
          />
          <FormCheck
            type="radio"
            id="captureOption"
            label="Capture Image"
            value="camera"
            checked={selectedOption === "camera"}
            onChange={handleOptionChange}
          />
          <FormCheck
            type="radio"
            id="urlOption"
            label="Enter Image URL"
            value="url"
            checked={selectedOption === "url"}
            onChange={handleOptionChange}
          />
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
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="form-control"
              />
            </div>
          ) : null}
          {selectedOption === "camera" ? (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ width: "100%", height: "auto" }}
              />
              <button onClick={capture}>Capture Image</button>
              {capturedImage && (
                <div>
                  <h2>Captured Image</h2>
                  <img src={capturedImage} alt="Captured" />
                </div>
              )}
            </div>
          ) : null}
          {selectedOption === "url" && (
            <div>
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleUrlChange}
                className="form-control"
              />
              <button onClick={fetchImage}>Fetch Image</button>
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
        <input
          {...props}
          value={value}
          onInput={handleChange}
          className={`${style()} form-control`}
        />
      )}
    </FormGroup>
  );
}
