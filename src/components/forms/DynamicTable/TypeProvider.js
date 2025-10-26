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
    case "time":
      var date = new Date(value);
      // Format only the time part in local time zone
      var timeString = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // or true for AM/PM
      }).format(date);
      if (value === null) {
        timeString = "";
      }

      return <span>{timeString}</span>;
    default:
      return <span>{value}</span>;
  }
};

export const TypeProvider = ({ ...props }) => {
  return <DataTypeProvider formatterComponent={filedFormat} {...props} />;
};
