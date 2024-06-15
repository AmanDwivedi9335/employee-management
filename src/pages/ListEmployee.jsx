import React, { useEffect, useState } from 'react'
import './style.scss';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";


function ListEmployee() {

    const [empData, setEmpData] = useState([]);

    useEffect(()=>{

            const q = query(collection(db, "employee"), orderBy("createdAt", "desc"));
            const unsubscribe = onSnapshot(q, (snapshot)=>{
                const employeeList = snapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                }));
                setEmpData(employeeList);
            });
            return ()=> unsubscribe();
    }, []);
    
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
            
                {empData.map((data, index)=> (
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
  )
}

export default ListEmployee;