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

function App() {
  const [date, setDate] = useState(dayjs());

  // const Layout = () => (
  //   <>
  //     <NavbarSection />
  //     <HeadSection />
  //     <Outlet />
  //   </>
  // )

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ListEmployee />, // Use Layout as the main element
    },
    {
      path: "/attendance",
      element: <AttendanceLog date={date} child={<Datepicker date={date} setDate={setDate} />} />,
    },
  ]);

  return (
    <>
      <NavbarSection />
      <HeadSection />
      <RouterProvider router={router} />
    </>
  )
}

export default App;
