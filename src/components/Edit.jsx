import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Edit = (props) => {
    let history = useHistory();
    const id = props.match.params.id;
    const editUser = props.data.find(item => item.id === id);
    const [data, setData] = useState(editUser);

    const { name, email, role } = data;

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.editHandler(id, data);
        history.push('/');
    }

    console.log(props.data, 'props');
    return (
        <div className= "container mt-3">
            <h2>Update User</h2>
            <form onSubmit= {handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name= "name" value= {name} onChange= {handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name= "email" value= {email} onChange= {handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input type="text" className="form-control" id="role" name= "role" value= {role} onChange= {handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default Edit;
