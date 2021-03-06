import React from 'react';
import styles from '../styles/datatable.module.css';

export default function Pagination ( {recordsPerPage, totalRecords, paginate} ) {
    const pageNumbers = [];
    // if index is less than or equal to total records/records perpage will give us the correct pagenumbers
    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item" >
                        <a onClick={() => paginate(number)} href="#" className={`${styles.pageLink} page-link`}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>

    );
}