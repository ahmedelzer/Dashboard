import React from 'react';

function DisplayError({ dataError = null, data, setTital }) {
  console.log(data.parameterField)
  const obj={
    "success": false,
    "error": {
        "title": "Validation Failure",
        "status": 422,
        "detail": "One or more validation errors occurred",
        "errors": {
            "dashboardMenuCategoryName": [
                "Dashboard Menu Category  name must be uniuq"
            ]
        }
    }
}
dataError=obj;
  if (dataError !== null && dataError !== undefined && dataError.success===false) {
    const errorMessages = dataError?.error?.errors?.[data.parameterField];
    // const errorMessages = dataError?.error?.errors?.dashboardMenuCategoryName;
    // Use filteredErrors as needed
    console.log(errorMessages);
    setTital(`${errorMessages}`)
    if (errorMessages && errorMessages.length > 0) {
      return (
        // errorMessages.map((err, index) => (
        //   <p key={index} className='text-[12px] font-bold text-[red] p-0 mb-[-10px]'>{err}</p>
        // ))
        null
      );
    }
  }
  
  return null;
}

export default DisplayError;
