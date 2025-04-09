import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { baseURLWithoutApi, publicImageURL } from "../../../request";
import TypeFile from "../PartingFrom/TypeFile";

const filedFormat = ({ value, column }) => {
  const isBlob = typeof value === "string" && value.startsWith("blob:");

  switch (column.type) {
    case "image":
      return (
        <img
          src={isBlob ? value : `${baseURLWithoutApi}/${value}`}
          alt="image"
          loading="lazy"
          style={{ width: "50px", height: "50px" }}
        />
      );
    case "publicImage":
      return (
        // <img
        //   src={isBlob ? value : `${publicImageURL}/${value}`}
        //   alt="image"
        //   loading="lazy"
        //   style={{ width: "50px", height: "50px" }}
        // />
        <div style={{ width: "50px", height: "50px" }}>
          <TypeFile
            file={isBlob ? value : `${publicImageURL}/${value}`}
            title={`${column.name}-image`}
            type={"publicImage"}
          />
        </div>
      );
    default:
      return <span>{value}</span>;
  }
};

export const TypeProvider = ({ ...props }) => {
  return <DataTypeProvider formatterComponent={filedFormat} {...props} />;
};
