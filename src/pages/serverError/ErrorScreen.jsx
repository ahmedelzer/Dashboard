import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../contexts/Language";

export default function ErrorScreen() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);
  const [disabled, setDisabled] = useState(true);
  const { localization } = useContext(LanguageContext);

  useEffect(() => {
    if (seconds === 0) {
      setDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const handleNavigate = () => {
    // Navigate to home and reload page
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-white px-6 py-8 w-[90%] mx-auto rounded-lg shadow-md">
      <h2 className="text-red-600 text-2xl font-bold mb-3">
        {localization?.ErrorScreen?.title}
      </h2>

      <h3 className="text-gray-900 text-base font-semibold mb-4">
        {localization?.ErrorScreen?.subtitle}
      </h3>

      <p className="text-gray-800 text-sm leading-5">
        {localization?.ErrorScreen?.description}
      </p>

      <div className="mt-6">
        <button
          onClick={handleNavigate}
          disabled={disabled}
          className={`px-4 py-2 rounded-md text-white transition
            ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {disabled
            ? localization?.ErrorScreen?.buttonText?.replace("{sec}", seconds)
            : localization?.ErrorScreen?.goBackButton}
        </button>
      </div>
    </div>
  );
}
