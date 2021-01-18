import React from 'react';
import { Table } from 'reactstrap';

export default function Datatable ( {data} ) {
  
  // this varaible serves as a gaurd clause to dynamically generate the table using the keys of the data object incase the data has no rows / is empty
  const columns = data[0] && Object.keys(data[0]);

    return (
      <Table responsive size="sm" striped dark className="mt-3" >
        <thead>
          <tr>
            {data[0] && columns.map((heading) => <th>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(row => <tr>
            {columns.map(column => <td>{row[column]}</td>)}
            </tr>)}
        </tbody>
      </Table>
    );
}