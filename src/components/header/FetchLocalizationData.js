import useFetch from "../hooks/APIsFunctions/useFetch";
import { GetProjectUrl } from "../../request";
import LocalizationSchemaActions from "../login-form/Schemas/Localization/LocalizationSchemaActions.json";
import { useEffect } from "react";

export const FetchLocalizationData = ({ language, setLocalizationData }) => {
  const getLocalizationAction = LocalizationSchemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  // Using useFetch hook to fetch data
  const { data } = useFetch(
    `/${getLocalizationAction?.routeAdderss}/${language}`,
    GetProjectUrl()
  );

  useEffect(() => {
    if (data) {
      setLocalizationData(data);
    }
  }, [data, setLocalizationData]);

  return <div></div>;
};

export default FetchLocalizationData;
