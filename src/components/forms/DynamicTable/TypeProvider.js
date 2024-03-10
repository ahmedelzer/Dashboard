import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { baseURLWithoutApi } from "../../../request";

const filedFormat = ({ value }) => {
  switch (value) {
    case "image":
      return (
        <img
          src={`${baseURLWithoutApi}/${value}`}
          alt="image"
          style={{ width: "50px", height: "50px" }}
        />
      );
    default:
      return (
        <img
          src={`${baseURLWithoutApi}/${value}`}
          alt="image"
          style={{ width: "50px", height: "50px" }}
        />
      );
  }
};
export const TypeProvider = (props) => (
  <DataTypeProvider formatterComponent={filedFormat} {...props} />
);
