import React from 'react';
import { Table } from 'reactstrap';
import styles from '../styles/datatable.module.css';

export default function Datatable ( {data} ) {
  const headingKey = 'heading';
  if(data.length > 0 ){
    // this varaible serves as a gaurd clause to dynamically generate the table using the keys of the data object incase the data has no rows / is empty
    const columns = data[0] && Object.keys(data[0]);
      
    return (
      <Table responsive size="sm" striped className="mt-3" >
        <thead className={styles.head}>
          <tr key={headingKey}>
            {data[0] && columns.map((heading) => <th key={heading} className={styles.heading}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => <tr key={index} className={styles.row}>
              {columns.map(column => <td key={column}>{row[column]}</td>)}
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
  return (
    <Table responsive size="sm" striped className="mt-3" >
      <thead className={styles.head}>
        <tr key={headingKey}>
          <th className={`${styles.heading} text-center`}>No Records Found</th>
        </tr>
      </thead>
    </Table>
  )
}