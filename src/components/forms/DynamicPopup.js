import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Button } from 'reactstrap';
import DataCellRender from '../hooks/FormsFunctions/DataCeller';

const DynamicPopup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  error,
  open,
  tableSchema,
}) => {
  const isNewRow = !row.dashboardMenuCategoryId;

  const handleSubmit = (event) => {
    if (Error) {
      event.preventDefault();
    } else {
      onApplyChanges();
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Modal isOpen={open} onClose={(e) => onCancelChanges} aria-labelledby="form-dialog-title">
        <ModalHeader id="form-dialog-title">
          {isNewRow ? 'Add New Employee' : 'Edit Employee'}
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
                    dataError={error}
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
          <Button type='submit' className='bg-transparent text-[#ff5722] hover:bg-[#ff5722] hover:text-black'>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default DynamicPopup;