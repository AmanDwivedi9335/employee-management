import './App.css'
import HeadSection from './components/headSection/HeadSection';
import NavbarSection from './components/navbar/NavbarSection';
import ListEmployee from './pages/ListEmployee';
import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";
import AttendanceLog from './pages/attendanceLog/AttendanceLog';
import Datepicker from './components/datepicker/Datepicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import AttReport from './pages/attendanceReport/AttReport';
import MainDash from './pages/dashboard/MainDash';
import { EmployeeProvider } from './components/contextprovider/EmployeeContext';

function App() {
  const [date, setDate] = useState(dayjs());

  const Layout = () => (
    <>
      <NavbarSection />
      <HeadSection />
      <Outlet />
    </>
  )

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use Layout as the main element
      children: [{
        path: "/",
        element: <MainDash/>
      },
      {
        path: "/employees",
        element: <ListEmployee />,
      },
      {
        path: "/attendance",
        element: <AttendanceLog date={date} child={<Datepicker date={date} setDate={setDate} />} />,
      },
      {
        path: "/attendancereport",
        element: <AttReport/>
      }]
    },
  ]);

  return (
    <>
    <EmployeeProvider>
      <RouterProvider router={router} />
    </EmployeeProvider>
    </>
  )
}

export default App;
