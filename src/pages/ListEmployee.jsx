import React, { useState } from 'react';
import './style.scss';
import { useEmployeeContext } from '../components/contextprovider/EmployeeContext';
import { Button, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Outlet, useNavigate } from 'react-router-dom';

function ListEmployee() {

  
  const { empData } = useEmployeeContext();

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  }
  
  return (
    <div className='table'>
      <table id="customers">
        <thead>
          <tr>
            <th width="5px">Sr.</th>
            <th>Employee Name</th>
            <th>Emp. code</th>
            <th>Unit</th>
            <th>Shift</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {empData.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              {console.log(data.id)}
              <td>{data.name}</td>
              <td>{data.empCode}</td>
              <td>{data.unit}</td>
              <td>{data.shift}</td>
              <td>{data.salary}</td>
              <td>{<Switch checked={data.status === 'Active'} color='secondary'/>}</td>
              <td>{data.category}</td>
              <td>
                <Button onClick={()=>handleUpdate(data.id)} idparam={data.id}>
                  <EditIcon/>
                </Button>
                <Button>
                  <DeleteIcon/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet/>
    </div>
  );
}

export default ListEmployee;
