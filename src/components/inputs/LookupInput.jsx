import React from "react";
import { defaultProjectProxyRoute } from "../../request";
import Table from "../forms/DynamicTable/Table";
import { fetchData } from "../hooks/APIsFunctions/useFetch";
import CustomDropdown from "../hooks/FormsFunctions/CustomDropdown";
import BaseInput from "./BaseInput"; // Assuming BaseInput is in the same folder or adjust the path
class LookupInput extends BaseInput {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      selectedRow: {},
      isPanelOpen: false,
    };
    this.setSelectedRow = this.setSelectedRow.bind(this);
    this.setPanelOpen = this.setPanelOpen.bind(this);
  }

  async componentDidMount() {
    const options = {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your-token", // Add any other headers you need
      },
    };
    const { data, error, isLoading } = await fetchData(
      `/Dashboard/GetDashboardFormSchemaBySchemaID?DashboardFormSchemaID=${this.props.lookupID}`,
      defaultProjectProxyRoute,
      options
    );

    this.setState({
      data,
      error,
      isLoading,
    });
  }

  setSelectedRow(row) {
    this.setState({ selectedRow: row });
  }

  setPanelOpen(isOpen) {
    this.setState({ isPanelOpen: isOpen });
  }

  render() {
    const { lookupReturnField, lookupDisplayField, lookupID } = this.props;
    const { data, selectedRow, isPanelOpen } = this.state;
    const panelContent = (
      <div className="drop-list">
        {data && (
          <Table
            schema={data}
            setPanelOpen={this.setPanelOpen}
            addMessage={false}
            editMessage={false}
            deleteMessage={false}
            isSearchingTable={true}
            key={lookupID}
            setSelectedRow={this.setSelectedRow}
          />
        )}
      </div>
    );

    return (
      <div className=" ">
        <CustomDropdown
          returnField={
            selectedRow[lookupReturnField] ||
            this.props.value[lookupReturnField]
          }
          displayField={
            selectedRow[lookupDisplayField] ||
            this.props.value[lookupDisplayField]
          }
          panelContent={panelContent}
          isPanelOpen={isPanelOpen}
          setPanelOpen={this.setPanelOpen}
          {...this.props}
        />
      </div>
    );
  }
}

export default LookupInput;
