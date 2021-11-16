import React, { useState } from 'react';
import '../css/Style.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination";

const Home = (props) => {
    const [search, setSearch] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const { currentPage, itemsPerPage, totalItems, pageSelected } = props;

    return (
        <div className="container mt-2">
            <div className="container">
                <h2>Admin-UI</h2>
                <input type="text" className= "form-control" placeholder="search by name, email or role" value= {search} onChange= {(e) => setSearch(e.target.value)} />
            </div>
            <div className="mt-3">
                <table className="table shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>
                                <input type="checkbox" value= {selectAll} onClick= {() => setSelectAll(!selectAll)} className= "form-check-input" />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th style= {{textAlign: 'center'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.currentItems.filter(item => {
                            const name = item.name.toLowerCase().includes(search.toLowerCase())
                            const email = item.email.toLowerCase().includes(search.toLowerCase())
                            const role = item.role.toLowerCase().includes(search.toLowerCase())
                            return name || email || role
                        }).map((item, index) => {
                            return (
                                <tr>
                                    <td>
                                        <input className= "form-check-input" type="checkbox" checked= {selectAll ? "selectAll" : null} />
                                    </td>
                                    <td style= {selectAll ? {backgroundColor: 'grey'}: null}>{item.name}</td>
                                    <td style= {selectAll ? {backgroundColor: 'grey'}: null}>{item.email}</td>
                                    <td style= {selectAll ? {backgroundColor: 'grey'}: null}>{item.role}</td>
                                    <td style= {{textAlign: 'center'}}>
                                        <Link to={`/edit/${item.id}`}>
                                            <EditIcon style= {{margin: '10px'}} />
                                        </Link>
                                        <DeleteOutlineIcon style= {{color: 'red'}}
                                        onClick= {() => props.handleDelete(index)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {selectAll && <button className="btn btn-danger" onClick= {() => props.handleDeleteAll()}>Delete Selected</button>}
                <Pagination currentPage={currentPage} itemsPerPage= {itemsPerPage} totalItems= {props.data.length} pageSelected= {pageSelected} />
            </div>
        </div>
    );
}

export default Home;
