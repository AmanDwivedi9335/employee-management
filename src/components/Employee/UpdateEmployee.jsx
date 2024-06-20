import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelectedEmployee } from '../contextprovider/SelectedEmployeeContext';
import { getEmployeeById } from '../contextprovider/EmployeeContext';
import MyForm from './MyForm';

const UpdateEmployee = () => {
  const { id } = useParams();
  const { setSelectedEmployee } = useSelectedEmployee();

  useEffect(()=>{
    const fetchEmployee = async () => {
      const employeeData = await getEmployeeById(id);
      setSelectedEmployee(employeeData);
    };

    fetchEmployee();

  }, [id, setSelectedEmployee]);

  return (
    <div>
      <MyForm/>
    </div>
  );
}

export default UpdateEmployee;
