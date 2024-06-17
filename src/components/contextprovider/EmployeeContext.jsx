import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [empData, setEmpData] = useState([]);
  const [totals, setTotals] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    workerEmployees: 0
  });

  useEffect(() => {
    const q = query(collection(db, "employee"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const employeeList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmpData(employeeList);
      
      // Calculate totals
      const totalEmployees = employeeList.length;
      const activeEmployees = employeeList.filter(emp => emp.status === 'Active').length;
      const inactiveEmployees = totalEmployees - activeEmployees;
      const workerEmployees = employeeList.filter(emp=> emp.shift === 'Worker').length;
      
      setTotals({ totalEmployees, activeEmployees, inactiveEmployees, workerEmployees });
    });
    return () => unsubscribe();
  }, []);

  return (
    <EmployeeContext.Provider value={{ empData, totals }}>
      {children}
    </EmployeeContext.Provider>
  );
};

const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};

export { EmployeeProvider, useEmployeeContext };
