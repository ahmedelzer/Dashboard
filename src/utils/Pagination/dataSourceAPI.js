import { SetReoute } from "../../request";
import { buildApiUrl } from "../../components/hooks/APIsFunctions/BuildApiUrl";

export const dataSourceAPI = (query, skip, take) => {
  // SetReoute(schema.projectProxyRoute);
  return buildApiUrl(query, {
    pageIndex: skip + 1,
    pageSize: take,
    // ...rowDetails,
  });
};
