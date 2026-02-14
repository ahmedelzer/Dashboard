import React, { useContext, useEffect, useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import DisplayIframe from "../../utils/components/DisplayIframe";
import { LanguageContext } from "../../contexts/Language";
import { detectWebsiteByUrl } from "../../utils/operation/detectWebsiteByUrl";

const IframeParameter = ({
  value = "",
  enable = true,
  title,
  fieldName,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [url, setUrl] = useState("");
  const { Right, localization } = useContext(LanguageContext);

  const handleLoad = () => {
    if (!inputValue.trim()) return;

    let finalUrl = inputValue.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }

    setUrl(finalUrl);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLoad();
  };

  const handleReset = () => {
    setInputValue("");
    setUrl("");
  };
  // useEffect(() => {
  //   const website = detectWebsiteByUrl(inputValue);
  // }, [inputValue]);
  return (
    <div className="card-body">
      <InputGroup className="mb-4">
        <Input
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          required={enable}
          readOnly={!enable}
          name={fieldName}
          id={fieldName}
          title={title}
          placeholder={placeholder}
        />
        <Button className="pop" onClick={handleLoad}>
          {localization.inputs.linkView.loadButton}
        </Button>
        <Button className="pop" onClick={handleReset}>
          {localization.inputs.linkView.clearButton}
        </Button>
      </InputGroup>

      {url && (
        <div className="border rounded overflow-hidden">
          <DisplayIframe
            url={url}
            width="100%"
            height="600px"
            title="URL Preview"
          />
        </div>
      )}
    </div>
  );
};

export default IframeParameter;
