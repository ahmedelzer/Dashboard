import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { baseURLWithoutApi, publicImageURL } from "../../../request";

const filedFormat = ({ value, column }) => {
  switch (
    column.type // Use 'fieldType' here
  ) {
    case "image":
      return (
        <img
          src={`${baseURLWithoutApi}/${value}`}
          alt="image"
          loading="lazy"
          style={{ width: "50px", height: "50px" }}
        />
      );
    case "publicImage":
      return (
        <img
          src={`${publicImageURL}/${value}`}
          alt="image"
          loading="lazy"
          style={{ width: "50px", height: "50px" }}
        />
      );
    default:
      return <span>{value}</span>;
  }
};

export const TypeProvider = ({ ...props }) => {
  return (
    <DataTypeProvider
      formatterComponent={filedFormat} // Pass 'fieldType' here
      {...props}
    />
  );
};
