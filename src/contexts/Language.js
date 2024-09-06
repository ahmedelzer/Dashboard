import React, { useState, createContext } from "react";

//context
export const LanguageContext = createContext();

const Language = ({ children }) => {
  const [Lan, setLan] = useState(
    window.localStorage.getItem("language") || "ENG_US"
  );
  const [Right, setRight] = useState(
    window.localStorage.getItem("right") === "true" || false
  );
  const [fileBase64, setFileBase64] = useState(null);
  const [localization, setLocalization] = useState(
    JSON.parse(window.localStorage.getItem("localization")) || {
      shortName: "EN",
      appInfo: {
        title: "Ahmed Ashraf2",
      },
      homePage: {
        id: 1,
        text: "Home",
        path: "/home",
        icon: "home",
      },
      browser: {
        modal: {
          header: "Fetch Image from URL",
          button: {
            fetch: "Fetch Image",
            cancel: "Cancel",
          },
        },
        input: {
          placeholder: "Enter image URL",
        },
        error: {
          invalidUrl: "Invalid URL format",
          fetchError: "Error fetching image",
          notImage: "URL does not point to an image",
          fetchFailed: "Failed to fetch image: {status}",
        },
      },
      webcam: {
        modal: {
          header: "Capture Image",
          button: {
            capture: "Capture Image",
            cancel: "Cancel",
          },
        },
      },
      drawPartionForm: {
        button: {
          cancel: "Cancel",
          edit: "Edit",
          save: "Save",
        },
      },
      fileContainer: {
        pagination: {
          buttonPrevious: "Previous",
          buttonNext: "Next",
          page: "Page",
          of: "of",
        },
      },
      footer: {
        footer: {
          copyright: "Copyright © 2011-{year} {appTitle} Inc.",
          trademark:
            "All trademarks or registered trademarks are property of their respective owners.",
        },
      },
      inputs: {
        boolean: [
          { text: "Yes", value: true },
          { text: "No", value: false },
        ],
        image: {
          imageAltValue: "uploaded",
          UrlPlaceholder: "Enter image URL",
          defaultImage:
            "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
        },
        base: { placeholder: "Enter " },
      },
      loadData: {
        loading: "Loading",
      },
      login: {
        sign: "Sign In",
        loginText: "Login",
        logoutText: "Logout",
        switchText: "Switch Account",
        forgotPassword: "Forgot password",
        rememberMeEditorOptions: {
          text: "Remember me",
          elementAttr: { class: "form-text" },
        },
      },
      panelActions: {
        button: {
          search: "Search",
          clear: "Clear",
        },
      },
      popup: {
        cancelButton: "Cancel",
        submitButton: "Done",
      },
      restPassword: {
        title: "Reset Password",
        description:
          "Please enter the email address that you used to register, and we will send you a link to reset your password via Email.",
      },
      tableTransform: {
        textButtonSkipValue: "Skip",
        textButtonFinishValue: "Finish",
        textButtonNextValue: "Next",
        parameterFieldValue: "parameterField",
      },
      waringPop: {
        deleteConfirmation: "Are you sure you want to delete this item?",
        yes: "Yes, I'm sure",
        no: "No, cancel",
      },
      messages: {},
    }
  );
  const [leftSelectionContext, setLeftSelectionContext] = useState([]);

  return (
    <LanguageContext.Provider
      value={{
        Lan,
        setLan,
        Right,
        setRight,
        fileBase64,
        setFileBase64,
        leftSelectionContext,
        setLeftSelectionContext,
        localization,
        setLocalization,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default Language;
