import React, { useState, useEffect } from 'react';
import Datatable from './datatable.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../styles/Home.module.css'

// call es6-promise and isomorphic-fetch incase the browser doesn't support fetch and/or promises
require("es6-promise").polyfill();
require('isomorphic-fetch');

export default function Home( { records } ) {
  // useState allows you set default values then return an array you can use to get and set values/state
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["FirstName", "LastName"]);

  // useEffect works inplace of componentDidMount to fetch data when component loads
  useEffect(() => {
    fetch('https://api.enye.tech/v1/challenge/records')
    .then((res) => res.json())
    .then((json) => setData(json.records.profiles));
    // console.log(data);
  }, []);

  //search function that filters thru the rows of the table to find the indexof a character entered into the query then returns that row if there's a match
  //toString because not all columns have sting data
  //toLowerCase to make the search case insensitive
  function search(rows) {
      return rows.filter(
        (row) => 
        searchColumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
          );
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <div className="container" >
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        {/* print out checkboxes for each iteration of column names */}
        {columns && columns.map((column) => 
            <label>
              <input type="checkbox" checked={searchColumns.includes(column)}
                onChange={(e) => {
                  // check for checked checkboxes then remove the just unchecked column or add to the previously checked columns
                  const checked = searchColumns.includes(column)
                  setSearchColumns(prev => checked ? prev.filter(sc => sc !== column) : [...prev, column]);
                }} 
              />
            {column}</label>
        )}
      </div>
      
      <div>
      {/* data stored in the state after fetching will be filtered thru the search function before being rendered on the table so as to search on the fly */}
        <Datatable data={search(data)} />
      </div>
    </div>
  )
}
