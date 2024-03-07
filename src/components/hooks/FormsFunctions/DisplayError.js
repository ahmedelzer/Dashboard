import React from "react";

function DisplayError({ dataError, data, setTital }) {
  console.log(data.parameterField);
  if (
    dataError !== null &&
    dataError !== undefined &&
    dataError.success === false
  ) {
    const errorMessages = dataError?.error?.errors?.[data.parameterField];
    console.log("====================================");
    console.log(data.parameterField);
    console.log(dataError);
    console.log("====================================");
    // const errorMessages = dataError?.error?.errors?.dashboardMenuCategoryName;
    // Use filteredErrors as needed
    console.log(errorMessages);
    setTital(`${errorMessages}`);
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
