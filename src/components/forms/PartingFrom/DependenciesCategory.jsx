import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { GetProjectUrl, SetReoute } from "../../../request";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import UseFetchWithoutBaseUrl from "../../hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import { FormContext } from "../../../contexts/Form";
import DotsLoading from "../../loading/DotsLoading";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import DrawFrom from "./DrawFrom";
import { loadSchema } from "../../loading/loadSchema";
import { onApply } from "../DynamicPopup/OnApplay";
import { useSearchParams } from "react-router-dom";

export const DependenciesCategory = () => {
  //todo make the same steps of the branding mart and get post actions
  const {
    getDependenciesAction,
    selectedRow,
    mainSchema,
    setSelectedRow,
    actionsForm,
    getActionByID,
  } = useContext(FormContext);
  // Get query parameters
  const [searchParams] = useSearchParams();
  const notificationLinkID = searchParams.get("notificationLinkID");
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (notificationLinkID && getActionByID) {
      setRoute(`/${getActionByID.routeAdderss}/${notificationLinkID}`);
    }
  }, [notificationLinkID, getActionByID]);

  // const [activeIndex, setActiveIndex] = useState(serviceCategoryID);
  SetReoute(mainSchema.projectProxyRoute);
  const { data: notificationRow } = useFetch(route, GetProjectUrl());
  useEffect(() => {
    if (notificationRow) {
      setSelectedRow(notificationRow);
    }
  }, [notificationRow, setSelectedRow]);

  const dataSourceAPI = (query) =>
    buildApiUrl(query, {
      // brandServiceID:
      //   selectedRow?.brandServiceID || "86bfbd18-d41b-471e-baba-3dbffd3d2240",
      ...selectedRow,
    });
  const query = dataSourceAPI(getDependenciesAction);
  const { data, isLoading, error } = UseFetchWithoutBaseUrl(query);

  // const { data: addDashboardItem } = useFetch(
  //   `/Dashboard/GetDashboardForm?DashboardMenuItemID=${data.addDashboardItemID}`,
  //   GetProjectUrl()
  // );
  // Use the result of loadSchema
  const schemaContent = loadSchema(data, error, DotsLoading, isLoading);
  const onSubmit = async (e, action, type, route) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    try {
      const request = await onApply(
        {
          ...formJson,
          ...selectedRow,
        },
        null,
        true,
        action,
        route
      );
      if (request) {
        // setResult(request);
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Optionally, handle the error here (e.g., show a notification)
    } finally {
    }
  };
  return (
    <div>
      {schemaContent}
      {data && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-center items-center">
            {data.dataSource.map((category, index) => (
              <Card
                key={index}
                tag={"p"}
                className="shadow-lg border-0 rounded-lg overflow-hidden"
              >
                <CardBody
                // className="bg-white p-4"
                >
                  <CardTitle
                    tag="h6"
                    className="font-bold text-xl mb-2 text-center"
                  >
                    {category.addPortalItemName}
                  </CardTitle>
                </CardBody>
              </Card>
            ))}
            {/* {!data && <DotsLoading />} */}
          </div>
          <form
            onSubmit={(e) =>
              onSubmit(
                e,
                actionsForm.postAction,
                null,
                // data.dataSource[0].projectProxyRoute
                mainSchema.projectProxyRoute
              )
            } // The form will only submit when Save button is clicked
          >
            <DrawFrom serviceRegistration={data} />
          </form>
        </div>
      )}
    </div>
  );
};
