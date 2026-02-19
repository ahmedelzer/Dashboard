import { useEffect, useState } from "react";
import { getField } from "../../../utils/operation/getField";
import { buildApiUrl } from "../../hooks/APIsFunctions/BuildApiUrl";
import UseFetchWithoutBaseUrl from "../../hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import { PolygonMapParameter } from "../../inputs";

const p1 =
  '[{"lat":29.159357041355424,"lng":30.5507804453373},{"lat":29.197725900405846,"lng":30.506835132837296},{"lat":29.27442054681336,"lng":30.3749991953373},{"lat":29.42763722319321,"lng":30.199217945337296},{"lat":29.542398322601738,"lng":30.0673820078373},{"lat":29.80966763726961,"lng":29.7597648203373},{"lat":30.114245744598513,"lng":29.5400382578373},{"lat":30.342065246371636,"lng":29.3642570078373},{"lat":30.569355748003844,"lng":29.2324210703373},{"lat":30.682801890953776,"lng":29.1005851328373},{"lat":30.871582821957475,"lng":29.0566398203373},{"lat":30.9469913564572,"lng":29.0126945078373},{"lat":31.05999264106237,"lng":28.968749195337296},{"lat":31.135252364697745,"lng":28.9248038828373},{"lat":31.248030044481112,"lng":28.9248038828373},{"lat":31.360673191606306,"lng":28.9248038828373},{"lat":31.398190963675983,"lng":28.9248038828373},{"lat":31.47318153169718,"lng":28.968749195337296},{"lat":31.548112064557003,"lng":28.968749195337296},{"lat":31.62298248226682,"lng":29.0566398203373},{"lat":31.66039512307388,"lng":29.0566398203373},{"lat":31.73517521911871,"lng":29.1005851328373},{"lat":31.847232251731132,"lng":29.1884757578373},{"lat":31.959153316146683,"lng":29.2324210703373},{"lat":32.03369169193891,"lng":29.3203116953373},{"lat":32.145385562629315,"lng":29.4082023203373},{"lat":32.145385562629315,"lng":29.4521476328373},{"lat":32.219772236460905,"lng":29.5400382578373},{"lat":32.29409809657151,"lng":29.583983570337296},{"lat":32.33123819794542,"lng":29.6279288828373},{"lat":32.368363067704735,"lng":29.7597648203373},{"lat":32.40547269651596,"lng":29.8037101328373},{"lat":32.442567075075075,"lng":29.891600757837296},{"lat":32.442567075075075,"lng":29.9355460703373},{"lat":32.442567075075075,"lng":29.9794913828373},{"lat":32.47964619410744,"lng":30.1113273203373},{"lat":32.47964619410744,"lng":30.1552726328373},{"lat":32.47964619410744,"lng":30.2431632578373},{"lat":32.47964619410744,"lng":30.3749991953373},{"lat":32.442567075075075,"lng":30.4628898203373},{"lat":32.442567075075075,"lng":30.5507804453373},{"lat":32.40547269651596,"lng":30.6826163828373},{"lat":32.368363067704735,"lng":30.814452320337296},{"lat":32.29409809657151,"lng":30.9023429453373},{"lat":32.256942772945905,"lng":31.0341788828373},{"lat":32.18258649653828,"lng":31.122069507837296},{"lat":32.145385562629315,"lng":31.1660148203373},{"lat":32.10816944421472,"lng":31.2978507578373},{"lat":32.03369169193891,"lng":31.3417960703373},{"lat":31.99643007718664,"lng":31.4736320078373},{"lat":31.99643007718664,"lng":31.5175773203373},{"lat":31.921861418447264,"lng":31.5615226328373},{"lat":31.847232251731132,"lng":31.6494132578373},{"lat":31.772542654655947,"lng":31.7373038828373},{"lat":31.69779270531287,"lng":31.8251945078373},{"lat":31.66039512307388,"lng":31.8691398203373},{"lat":31.510654307532683,"lng":32.0009757578373},{"lat":31.435693747063894,"lng":32.0449210703373},{"lat":31.248030044481112,"lng":32.1328116953373},{"lat":31.210452419007595,"lng":32.1767570078373},{"lat":31.097629956393977,"lng":32.2207023203373},{"lat":30.9469913564572,"lng":32.2646476328373},{"lat":30.871582821957475,"lng":32.3085929453373},{"lat":30.796114909344855,"lng":32.3525382578373},{"lat":30.682801890953776,"lng":32.3525382578373},{"lat":30.645001287372306,"lng":32.3964835703373},{"lat":30.569355748003844,"lng":32.3964835703373},{"lat":30.53151083364524,"lng":32.3964835703373},{"lat":30.493651170505892,"lng":32.4404288828373},{"lat":30.493651170505892,"lng":32.4843741953373},{"lat":30.417887641071157,"lng":32.4843741953373},{"lat":30.379983796443767,"lng":32.5283195078373},{"lat":30.342065246371636,"lng":32.5283195078373},{"lat":30.342065246371636,"lng":32.5722648203373},{"lat":30.266184073558826,"lng":32.5722648203373},{"lat":30.22822147272596,"lng":32.5722648203373},{"lat":30.190244210264005,"lng":32.5722648203373},{"lat":30.07622456354286,"lng":32.6162101328373},{"lat":30.0381887651539,"lng":32.6162101328373},{"lat":29.96207336100224,"lng":32.6601554453373},{"lat":29.88589962169627,"lng":32.7041007578373},{"lat":29.733377498237076,"lng":32.7041007578373},{"lat":29.695210649161083,"lng":32.7480460703373},{"lat":29.580623120820174,"lng":32.7480460703373},{"lat":29.465905362203006,"lng":32.7480460703373},{"lat":29.351057685705033,"lng":32.7480460703373},{"lat":29.27442054681336,"lng":32.7480460703373},{"lat":29.120973840852503,"lng":32.7480460703373},{"lat":29.00573830949631,"lng":32.7480460703373},{"lat":28.928843133114825,"lng":32.7480460703373},{"lat":28.851890877683992,"lng":32.7041007578373},{"lat":28.813393375475773,"lng":32.6601554453373},{"lat":28.736355682639356,"lng":32.6601554453373},{"lat":28.697815516328,"lng":32.6162101328373},{"lat":28.659261153016082,"lng":32.5722648203373},{"lat":28.62069260493757,"lng":32.5722648203373},{"lat":28.582109884356534,"lng":32.5722648203373},{"lat":28.543513003567337,"lng":32.5722648203373},{"lat":28.504901974894562,"lng":32.4843741953373},{"lat":28.466276810692925,"lng":32.4843741953373},{"lat":28.466276810692925,"lng":32.4404288828373},{"lat":28.427637523347407,"lng":32.3964835703373},{"lat":28.38898412527321,"lng":32.3525382578373},{"lat":28.38898412527321,"lng":32.2646476328373},{"lat":28.350316628915728,"lng":32.2207023203373},{"lat":28.350316628915728,"lng":32.0888663828373},{"lat":28.311635046750613,"lng":32.0449210703373},{"lat":28.272939391283685,"lng":31.9570304453373},{"lat":28.272939391283685,"lng":31.8691398203373},{"lat":28.272939391283685,"lng":31.8251945078373},{"lat":28.234229675051058,"lng":31.6933585703373},{"lat":28.234229675051058,"lng":31.6494132578373},{"lat":28.195505910618976,"lng":31.6054679453373},{"lat":28.195505910618976,"lng":31.5175773203373},{"lat":28.195505910618976,"lng":31.4296866953373},{"lat":28.195505910618976,"lng":31.3417960703373},{"lat":28.15676811058399,"lng":31.2978507578373},{"lat":28.15676811058399,"lng":31.1660148203373},{"lat":28.15676811058399,"lng":31.0341788828373},{"lat":28.15676811058399,"lng":30.9902335703373},{"lat":28.15676811058399,"lng":30.9023429453373},{"lat":28.15676811058399,"lng":30.814452320337296},{"lat":28.15676811058399,"lng":30.7705070078373},{"lat":28.15676811058399,"lng":30.7265616953373},{"lat":28.15676811058399,"lng":30.6386710703373},{"lat":28.15676811058399,"lng":30.5947257578373},{"lat":28.15676811058399,"lng":30.506835132837296},{"lat":28.15676811058399,"lng":30.4628898203373},{"lat":28.15676811058399,"lng":30.4189445078373},{"lat":28.15676811058399,"lng":30.3310538828373},{"lat":29.159357041355424,"lng":30.5507804453373}]';
const testValue = JSON.stringify([
  [
    [30.0505, 31.2405],
    [30.0605, 31.2605],
    [30.0405, 31.2805],
    [30.0505, 31.2405],
  ],
  [
    [30.0805, 31.3005],
    [30.0905, 31.3205],
    [30.0705, 31.3405],
    [30.0805, 31.3005],
  ],
]);

function PolygonForm({ schema, enable, setNewPolygon }) {
  //   const { localization } = useContext(LanguageContext);

  //   // const schema =
  //   //   schemas &&
  //   //   schemas?.find((schema) => schema.schemaType === "FilesContainer");
  //   // console.log(schema);

  //   const [selectedFiles, setSelectedFiles] = useState([]);
  //   const [proxyRoute, setProxyRoute] = useState("");
  //   const [selectedServerFiles, setSelectedServerFiles] = useState([]);
  //   const [automated, setAutomated] = useState([]);
  //   const [trigger, setTrigger] = useState(0);
  //   const [selectPostAction, setSelectPostAction] = useState({});
  //   const [modalFileIsOpen, setModalFileIsOpen] = useState(false);

  //   const idField = schema.idField;
  const parameters = schema.dashboardFormSchemaParameters;
  const fieldsType = {
    polygon: getField(parameters, "drawPolygon"),
    cityISO_CodeValue: getField(parameters, "cityISOCodeValue"),
    description: getField(parameters, "areaDescription"),
    centerLatitudePoint: getField(parameters, "centerLatitudePoint"), //the center point of the polygon
    centerLongitudePoint: getField(parameters, "centerLongitudePoint"),
    areaName: getField(parameters, "areaName"),
    // centerZoom: getField(parameters, "centerZoom"),
    buildNumber: getField(parameters, "buildNumber"),
    floorNumber: getField(parameters, "floorNumber"),
    radius: getField(parameters, "radius"), //the max radius of the polygon
  };
  //   const fileFieldNameScrollPaging =
  //     serverSchema.dashboardFormSchemaParameters.find(
  //       (field) => field.parameterType === "image",
  //     )?.parameterField;
  //   //here
  //   const RefreshFiles = () => {
  //     setTrigger((prevTrigger) => prevTrigger + 1); // Increment trigger
  //   };
  //   const [selectedFilesContext, setSelectedFilesContext] = useState([]);
  //   const [open, setOpen] = useState(false);
  //   const schemaWithoutID = schema.dashboardFormSchemaParameters.filter(
  //     (schema) => !schema.isIDField,
  //   );
  //   // const { getActionSchema, postActionSchema, deleteActionSchema } =
  //   //   GetActionsFromSchema(schema);
  //   // const {
  //   //   getAction: getActionSchema,
  //   //   postAction: postActionSchema,
  //   //   deleteAction: deleteActionSchema,
  //   // } = GetActionsFromSchema(schema);
  //   const {
  //     getAction: getActionServerSchema,
  //     postAction: postActionServerSchema,
  //     deleteAction: deleteActionServerSchema,
  //   } = GetActionsFromSchema(serverSchema);
  //   const isSubset = IsSecondListSubsetOfFirstList(
  //     parentSchemaParameters,
  //     schemaWithoutID,
  //     ["parameterField"],
  //   );

  //   function handleUpload(postAction, containerSelectedFiles, route) {
  //     setSelectPostAction(postAction);
  //     if (containerSelectedFiles.length > 0) {
  //       setSelectedFilesContext(containerSelectedFiles);
  //       setProxyRoute(route);
  //     }
  //     setOpen(!isSubset);
  //     setAutomated(isSubset);
  //     setSelectedFiles([]);
  //     setSelectedServerFiles([]);
  //   }
  //   function handleDelete(postAction, containerSelectedFiles, route) {
  //     setSelectPostAction(postAction);
  //     if (containerSelectedFiles.length > 0) {
  //       setSelectedFilesContext(containerSelectedFiles);
  //       setProxyRoute(route);
  //     }
  //     setOpen(!isSubset);
  //     setAutomated(isSubset);
  //     setSelectedFiles([]);
  //     setSelectedServerFiles([]);
  //   }
  //   // subset checking
  //   const {
  //     getAction: getActionSchema,
  //     postAction: postActionSchema,
  //     deleteAction: deleteActionSchema,
  //     isLoading,
  //   } = GetActionsFromSchema(schema);
  const [value, setValue] = useState([{}]);
  const [boundsData, setBoundsData] = useState([]);
  const dataSourceAPI = (query, data) => {
    return buildApiUrl(query, {
      ...data,
    });
  };
  const staticGetAction = {
    dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
    dashboardFormActionMethodType: "Get",
    routeAdderss: "AreaPolygon/GetAreasPolygons",
    body: "string",
    returnPropertyName: "string",
    projectProxyRoute: "BrandingMartLogistic",
    dashboardFormSchemaActionQueryParams: [
      {
        dashboardFormSchemaActionQueryParameterID:
          "26bc9d7e-781f-4638-a25d-50b9c516e00d",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "NorthEastLatitude",
        dashboardFormParameterField: "northEastLatitude",
      },
      {
        dashboardFormSchemaActionQueryParameterID:
          "54fb6bb3-32ad-42ff-bd09-ab0fb6378886",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "NorthEastLongitude",
        dashboardFormParameterField: "northEastLongitude",
      },
      {
        dashboardFormSchemaActionQueryParameterID:
          "26bc9d7e-781f-4638-a25d-50b9c516e00d",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "SouthWestLatitude",
        dashboardFormParameterField: "southWestLatitude",
      },
      {
        dashboardFormSchemaActionQueryParameterID:
          "54fb6bb3-32ad-42ff-bd09-ab0fb6378886",
        dashboardFormSchemaActionID: "40cfb6e5-2d09-4960-a311-21df3eeb8d26",
        parameterName: "SouthWestLongitude",
        dashboardFormParameterField: "southWestLongitude",
      },
    ],
  };
  const { data } = UseFetchWithoutBaseUrl(
    dataSourceAPI(staticGetAction, boundsData),
  );
  useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);
  return (
    <div>
      <PolygonMapParameter
        enable={enable}
        value={value}
        fieldsType={fieldsType}
        setNewPolygon={setNewPolygon}
        setBoundsData={setBoundsData}
        // setSubSchema={sub}
        // includedSchema={findServerContainer}
        // fields={schema?.dashboardFormSchemaParameters}
      />
    </div>
  );
}

export default PolygonForm;
