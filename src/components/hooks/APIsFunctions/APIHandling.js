import {
  GetProjectUrl,
  languageID,
  languageName,
  SetHeaders,
  token,
} from "../../../request";
export default async function APIHandling(url, methodType, sendBody) {
  var myHeaders = new Headers();
  // const navigate = useNavigate();
  myHeaders.append("Content-Type", "application/json");

  // myHeaders.append("languageName", "ARABIC");
  var raw = JSON.stringify(sendBody);

  var requestOptions = {
    method: methodType,
    headers: myHeaders,
    ...SetHeaders(),
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(GetProjectUrl() + "/" + url, requestOptions);
    const result = await response.json();

    // Check if the API call was successful based on the HTTP status code
    if (response.ok) {
      const successResponse = {
        success: true,
        data: result,
      };
      return successResponse;
    } else {
      const errorResponse = {
        success: false,
        error: result, // You can customize this based on your API response structure
      };
      if (result.code === 401) {
        //todo handle error message
        // RedirectToLogin(navigate, result);
        return;
      }
      return errorResponse;
    }
  } catch (error) {
    // If there's an exception, return an error response
    const exceptionResponse = {
      success: false,
      error: "An error occurred during the API call.",
    };
    return exceptionResponse;
  }
}
