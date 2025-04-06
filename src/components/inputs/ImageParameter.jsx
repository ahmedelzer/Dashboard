import React, { useRef, useState, useEffect, useContext } from "react";
import defaultImage from "../../assets/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
import { imageInputStyle } from "./styles";
import { LanguageContext } from "../../contexts/Language";
import convertImageToBase64 from "./InputActions/ConvertImageToBase64";

const ImageParameter = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [base64, setIsBase64] = useState(false);
  const imageRef = useRef(null);
  const { localization } = useContext(LanguageContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageChange = () => {
    if (imageRef.current && defaultImage !== imageRef.current.src) {
      convertImageToBase64(imageRef.current.src)
        .then((base64) => setIsBase64(base64))
        .catch((error) =>
          console.error("Failed to convert image to Base64:", error)
        );
    }
  };
  useEffect(() => {
    if (props.defaultValue !== props.value) {
      handleImageChange();
    }
  }, [props.value]); // Dependency array mimicking componentDidUpdate when value changes

  const { fieldName, value } = props;
  const imageAltValue = localization.inputs.image.imageAltValue;

  return (
    <div
      className={imageInputStyle.container}
      title={props.title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imageRef}
        src={value || defaultImage}
        alt={imageAltValue}
        key={fieldName}
        className={`${imageInputStyle.image} ${props.className}`}
      />
      {isHovered && (
        <div className={imageInputStyle.hoverOverlay}>
          {props.actions?.map((action, index) => (
            <label key={index} htmlFor="" className="p-0 m-0">
              <div className={imageInputStyle.actionItem}>{action}</div>
            </label>
          ))}
        </div>
      )}
      <input type="hidden" name={props.fieldName} value={base64 || null} />
    </div>
  );
};

export default ImageParameter;
