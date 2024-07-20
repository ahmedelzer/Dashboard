import FormContainer from "../../forms/DynamicPopup/FormContainer";
import Popup from "../../forms/DynamicPopup/Popup";
import Table from "../../forms/DynamicTable/Table";
import PanelActions from "../../forms/PartingFrom/PanelActions";
import PartionFrom from "../../forms/PartingFrom/PartionFrom";
function SelectForm(schema) {
  return (
    <div>
      <PartionFrom
        Header={schema.dashboardFormSchemaInfoDTOView.schemaHeader}
        key={schema.idField}
        Popup={
          <FormContainer
            tableSchema={schema}
            row={{}}
            // onChange={onChange}
            // errorResult={errorResult}
            // img={img}
          />
        }
        Table={
          schema.schemaType === "Table" ? (
            <Table
              key={schema.idField}
              schema={schema}
              paging={true}
              isSearchingTable={false}
            />
          ) : null
        }
      />
      <PanelActions
        key={schema.idField}
        Popup={
          <FormContainer
            tableSchema={schema}
            row={{}}
            // onChange={onChange}
            // errorResult={errorResult}
            // img={img}
          />
        }
        Table={
          <Table
            key={schema.idField}
            schema={schema}
            paging={true}
            isSearchingTable={false}
          />
        }
      />
    </div>
  );
}
export default SelectForm;
