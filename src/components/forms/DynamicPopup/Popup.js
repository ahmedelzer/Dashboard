import React from 'react';
  import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Container, Row, Col,
  } from 'reactstrap';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import DataCellRender from '../../hooks/FormsFunctions/DataCeller';


  import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';


const Popup = ({
    row,
    onChange,
    onApplyChanges,
    onCancelChanges,
    open,
    tableSchema,
    rows,
    errorResult,
    returnRowData,
    isNewRow
  }) => {

    const actionType= isNewRow? 'Add':'Update'

    const handleSubmit = (event) => {
    };
  
    return (
      <form onSubmit={(e)=>handleSubmit(e)}>
      <Modal isOpen={open} onClose={(e)=>onCancelChanges} aria-labelledby="form-dialog-title">
        <ModalHeader id="form-dialog-title">
          {isNewRow ? 'Adding' : 'Editing'}
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {tableSchema?.dashboardFormSchemaParameters?.map((param, index) => (
                <Col sm={param.lookupID === null ? 6 : 12} className="px-2" key={index}>
                  <DataCellRender
                    data={param}
                    value={row[param.parameterField]}
                    onChange={onChange}
                    dataError={errorResult} // Ensure datapost is defined
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancelChanges} className='bg-transparent text-[#ff5722] hover:bg-[#ff5722] hover:text-black'>
            Cancel
          </Button>
          {' '}
          <Button onClick={onApplyChanges(actionType)}  className='bg-transparent text-[#ff5722] hover:bg-[#ff5722] hover:text-black'>
            Done
          </Button>
        </ModalFooter>
    </Modal>
      </form>
    );
  };


 
  export default Popup

