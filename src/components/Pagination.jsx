import React from 'react';

const Pagination = (props) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav style= {{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                <ul className="pagination pagination-md justify-content-end border-0">
                    {pageNumbers.map((item, index) => {
                        return (
                            <li key= {index} className= {item === props.currentPage ? "page-item active" : "page-item"}>
                                <button onClick= {() => props.pageSelected(item)} className="page-link">{item}</button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
