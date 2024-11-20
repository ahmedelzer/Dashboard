import React from "react";
export function loadSchema(schema, error, LoadingComponent, isLoading) {
  console.log(error);

  if (error && !schema) {
    // Handle error, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    // Display a loading indicator while data is being fetched
    return <LoadingComponent />;
  }
}
