import React, {
  useState,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import {
  VirtualTableState,
  createRowCache,
} from '@devexpress/dx-react-grid';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  VirtualTable,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Container, Row, Col, Label, FormGroup, Input,
} from 'reactstrap';
import fetchDataWithHandling from '../../components/hooks/FechUrl'
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import useFetch from '../../components/hooks/useFetch';

import { buildApiUrl } from './BuildApiUrl';
import { Editing } from 'devextreme-react/data-grid';
const VIRTUAL_PAGE_SIZE = 50;
const MAX_ROWS = 50000;
const URL = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales';
const buildQueryString = (skip, take) => (
  `${URL}?requireTotalCount=true&skip=${skip}&take=${take}`
);
function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...props} />
    </FormGroup>
  );
}
const getRowId = row => row.dashboardMenuCategoryId;

const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: '',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'UPDATE_ROWS':
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case 'START_LOADING':
      return {
        ...state,
        requestedSkip: payload.requestedSkip,
        take: payload.take,
      };
    case 'REQUEST_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_QUERY':
      return {
        ...state,
        lastQuery: payload,
      };
    default:
      return state;
  }
}
const dataSourceAPI =(query,skip, take) =>  buildApiUrl(query, 
  {
  pageIndex: (skip/take)+1,
  pageSize: take
 });
const DynamicTable = ({ schema }) => {
  const { data } = useFetch(`/Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${schema[0].dashboardFormSchemaID}`);
  const schemaActions = data;

const getAction = schemaActions&&schemaActions.filter(action => action.dashboardFormActionMethodType === 'Get')[0];
const postAction = schemaActions&&schemaActions.filter(action => action.dashboardFormActionMethodType === 'Post')[0];
const putAction = schemaActions&&schemaActions.filter(action => action.dashboardFormActionMethodType === 'Put')[0];
console.log(2)
// console.log(getAction)
  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Assuming schema[0].dashboardFormSchemaParameters is an array of parameters
    const dynamicColumns = schema[0]?.dashboardFormSchemaParameters?.map(param => ({
      name: param.parameterField,
      title: param.parameterTitel,
      getCellValue: row => row[param.parameterField],
    })) || [];

    setColumns([
      ...dynamicColumns,
    ]);
  }, [schema]);


  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
  const updateRows = (skip, count, newTotalCount) => {
    dispatch({
      type: 'UPDATE_ROWS',
      payload: {
        skip,
        rows: cache.getRows(skip, count),
        totalCount: newTotalCount < MAX_ROWS ? newTotalCount : MAX_ROWS,
      },
    });
  };

  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
  };

  const loadData = () => {
    const {
      requestedSkip, take, lastQuery, loading,
    } = state;
    console.log(4);
    console.log(requestedSkip);
    console.log(5);
    console.log(take);
    const query = dataSourceAPI(getAction,requestedSkip, take);
    console.log(1);
    console.log(query);
    if (query !== lastQuery && !loading) {
      const cached = cache.getRows(requestedSkip, take);
      if (cached.length === take) {
        updateRows(requestedSkip, take);
      } else {
        dispatch({ type: 'FETCH_INIT' });
        fetch(query)
          .then(response => response.json())
          .then(({ dataSource, count  }) => {
            //MAX_ROWS = count;
            cache.setRows(requestedSkip, dataSource);
            updateRows(requestedSkip, take, count);
          })
          .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
        // var response =  fetchDataWithHandling(query, 'GET');
        // response === 'REQUEST_ERROR'? (dispatch({ type: 'REQUEST_ERROR' })): 
        // (
        //   cache.setRows(requestedSkip, response.dataSource);
        //     updateRows(requestedSkip, take, response.count);
        // )
      }
      dispatch({ type: 'UPDATE_QUERY', payload: query });
    }
  };

  useEffect(() => loadData());
  
  const {
    rows, skip, totalCount, loading,
  } = state;
  const Popup = ({
    row,
    onChange,
    onApplyChanges,
    onCancelChanges,
    open,
  }) => {
    const isNewRow = !row.dashboardMenuCategoryId;
    console.log(row)
    let rows= [row]
    console.log(rows)
    return (
      <Modal isOpen={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
        <ModalHeader id="form-dialog-title">
          {isNewRow ? 'Add New Employee' : 'Edit Employee'}
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col sm={6} className="px-2">
                <FieldGroup
                  name="dashboardMenuCategoryId"
                  label="Dashboard Menu Category Id"
                  value={row.dashboardMenuCategoryId}
                  onChange={onChange}
                />
              </Col>
              <Col sm={6} className="px-2">
                <FieldGroup
                  name="dashboardMenuCategoryName"
                  label="Dashboard Menu Category Name"
                  value={row.dashboardMenuCategoryName}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancelChanges} color="secondary">
            Cancel
          </Button>
          {' '}
          <Button onClick={onApplyChanges}  color="primary">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  
  const PopupEditing = React.memo(({ popupComponent: Popup }) => (
    <Plugin>
      <Template name="popupEditing">
        <TemplateConnector>
          {(
            {
              rows,
              getRowId,
              addedRows,
              editingRowIds,
              createRowChange,
              rowChanges,
            },
            {
              changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
              stopEditRows, cancelAddedRows, cancelChangedRows,
            },
          ) => {
            const isNew = addedRows.length > 0;
            let editedRow;
            let rowId;
            if (isNew) {
              rowId = 0;
              editedRow = addedRows[rowId];
            } else {
              [rowId] = editingRowIds;
              const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
              editedRow = { ...targetRow, ...rowChanges[rowId] };
            }
  
            const processValueChange = ({ target: { name, value } }) => {
              const changeArgs = {
                rowId,
                change: createRowChange(editedRow, value, name),
              };
              if (isNew) {
                changeAddedRow(changeArgs);
              } else {
                changeRow(changeArgs);
              }
            };
            const rowIds = isNew ? [0] : editingRowIds;
            const applyChanges = () => {
              if (isNew) {
                commitAddedRows({ rowIds });
              } else {
                stopEditRows({ rowIds });
                commitChangedRows({ rowIds });
              }
            };
            const cancelChanges = () => {
              if (isNew) {
                cancelAddedRows({ rowIds });
              } else {
                stopEditRows({ rowIds });
                cancelChangedRows({ rowIds });
              }
            };
  
            console.log(rowId)
            const open = editingRowIds.length > 0 || isNew;
            return (
              <Popup
                open={open}
                row={editedRow}
                onChange={processValueChange}
                onApplyChanges={applyChanges}
                onCancelChanges={cancelChanges}
              />
            );
          }}
        </TemplateConnector>
      </Template>
      <Template name="root">
        <TemplatePlaceholder />
        <TemplatePlaceholder name="popupEditing" />
      </Template>
    </Plugin>
  ));
  
  const commitChanges = ({ added, changed }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    // setRows(changedRows);
  };
  
  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        {/* <Editing
            mode="row"
            allowUpdating={true}
            // allowDeleting={true}
            allowAdding={true} /> */}
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table />
        <TableHeaderRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
        />
        <PopupEditing popupComponent={Popup} />
      </Grid>
    </div>
  );
};
export default DynamicTable;