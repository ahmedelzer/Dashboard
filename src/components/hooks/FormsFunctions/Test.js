var response = {
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-7fd6749ffa95c31eb034752bee31f432-3aa5eb324c6b9c92-00",
    "errors": {
      "DashboardMenuCategoryName": ["The DashboardMenuCategoryName field is required."]
    }
  };
function DisplayErorr({ dataErrors}){
    if (dataErrors !== null) {
    const errorMessages = dataErrors.errors;
      // Use filteredErrors as needed
    console.log(dataerors)
    if(filteredErrors.length>0){
        return (
        <p className=' text-[12px] font-bold text-[red] p-0 mb-[-10px]'>err{filteredErrors[0].err}</p>
        )
    };
    } 
        return null;
}
