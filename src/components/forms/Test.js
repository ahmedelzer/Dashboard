import React, { useState } from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import i from '../../1.png'
const ImageFormatter = ({ value }) => (
  <img src={value} alt="image" style={{ width: '50px', height: '50px' }} />
);

const ImageTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={ImageFormatter}
    {...props}
  />
);

export default () => {
  const [columns] = useState([
    { name: 'image', title: 'Image' },
  ]);

  const rows = [
    { image: 'https://ahmedelzer.github.io/HTML_And_CSS_Template_two/images/shuffle-02.jpg'},
    // Add more rows if needed
  ];

  const [tableColumnExtensions] = useState([]);

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
      >
        <ImageTypeProvider for={['image']} />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
      </Grid>
    </div>
  );
};
