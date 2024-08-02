import React, { Component } from "react";
import { Button } from "reactstrap";
import BaseInput from "./BaseInput"; // Assuming BaseInput is in the same folder or adjust the path
import CustomDropdown from "../hooks/FormsFunctions/CustomDropdown";
import Table from "../forms/DynamicTable/Table";
import GetFormSchema from "../hooks/DashboardAPIs/GetFormSchema";
import useFetch, { fetchData } from "../hooks/APIsFunctions/useFetch";
import { defaultProjectProxyRoute } from "../../request";
import APIHandling from "../hooks/APIsFunctions/APIHandling";
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

    // this.setState({
    //   data,
    //   error,
    //   isLoading,
    // });
  }

  setSelectedRow(row) {
    this.setState({ selectedRow: row });
  }

  setPanelOpen(isOpen) {
    this.setState({ isPanelOpen: isOpen });
  }

  render() {
    const {
      lookupReturnField,
      fieldName,
      value,
      lookupDisplayField,
      lookupID,
      data, //take more time
    } = this.props;
    // this.componentDidMount();
    // fetch(
    //   `/Dashboard/GetDashboardFormSchemaBySchemaID?DashboardFormSchemaID=${lookupID}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => l)
    //   .catch((error) => console.error("Error fetching data:", error));
    const { selectedRow, isPanelOpen } = this.state;

    // exstract sytel
    const panelContent = (
      <div className="drop-list text-center">
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
          buttonText={selectedRow[lookupReturnField]}
          displayField={selectedRow[lookupDisplayField]}
          panelContent={panelContent}
          isPanelOpen={isPanelOpen}
          setPanelOpen={this.setPanelOpen}
        />
      </div>
    );
  }
}

export default LookupInput;
