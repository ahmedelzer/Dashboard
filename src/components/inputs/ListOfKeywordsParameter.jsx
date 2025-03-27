import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";
import TextParameter from "./TextParameter";

function ListOfKeywordsParameter({ value, ...props }) {
  const [keywords, setKeywords] = useState((value && value.split(",")) || []);
  const { localization } = useContext(LanguageContext);

  const sendRequest = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    e.stopPropagation(); // Stop event bubbling

    const form = e.target.closest("form"); // Get form reference
    if (!form) return;

    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const newKeyword = formJson.keyword?.trim(); // Trim input spaces

    if (newKeyword) {
      setKeywords((prevKeywords) => [...prevKeywords, newKeyword]);
      form.reset(); // Clear input field after submission
    }
  };

  const removeKeyword = (index) => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form className="flex">
        <TextParameter {...props} fieldName={"keyword"} />
        <Button className="pop mx-2" type="button" onClick={sendRequest}>
          +
        </Button>
      </form>

      {/* Render Added Keywords */}
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="relative bg-border px-3 py-1 rounded-lg flex items-center"
          >
            <span className="text-sm">{keyword}</span>
            <button
              className="absolute -top-2 -right-2 bg-red-500 text-bg w-4 h-4 flex items-center justify-center rounded-full text-xs"
              onClick={() => removeKeyword(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input type="hidden" name={props.fieldName} value={keywords} />
    </div>
  );
}

export default ListOfKeywordsParameter;
