import React from 'react';
import './style.scss';
import { useEmployeeContext } from '../components/contextprovider/EmployeeContext';

function ListEmployee() {
  const { empData } = useEmployeeContext();
  
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
          </tr>
        </thead>
        <tbody>
          {empData.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.empCode}</td>
              <td>{data.unit}</td>
              <td>{data.shift}</td>
              <td>{data.salary}</td>
              <td>{data.status}</td>
              <td>{data.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployee;
