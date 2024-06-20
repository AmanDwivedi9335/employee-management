import React, { useEffect, useState } from 'react'
import {Stack, Button, Modal, Box, Typography, TextField, Grid, Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import './style.scss';
import { FormGroup } from '@mui/material';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, Navigate, useNavigate , useLocation} from 'react-router-dom';
import AttendanceLog from '../../pages/attendanceLog/AttendanceLog';
import TemporaryDrawer from '../../components/sidebar/TemporaryDrawer';
import ListEmployee from '../../pages/ListEmployee';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '60%',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
  };

function HeadSection() {
    const [headtitle, setHeadtitle ] = useState(null);
    const [open, setOpen] = useState(false);
    const [unit, setUnit] = useState('');
    const [shift, setShift] = useState('');
    const [empName, setEmpName] = useState('');
    const [email, setEmail] = useState('');
    const [ecode, setEcode] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [salary, setSalary] = useState('');
    const [hourSalary, setHourSalary] = useState('');
    const [city, setCity] = useState('');


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();
    const location = useLocation();

    const attendanceRoute = () => {
        navigate('/attendance');
    }

    const formOpen = () => {
        setOpen(true);
    }

    const handleAddEmployee = async() => {
        const employeeData = {
            name : empName,
            email: email,
            empCode: ecode,
            phone: phone,
            salary: salary,
            hourSalary: hourSalary,
            unit,
            shift,
            status,
            category,
            city,
            createdAt: serverTimestamp()
        };
        try{
            await addDoc(collection(db, 'employee'), employeeData);
            handleClose();
            
        }catch(error){
            console.log("Error while adding doc", error);
        }
    };

    useEffect(()=> {
        switch(location.pathname){
            case '/':
                setHeadtitle('Dashboard');
                break;

            case '/attendance':
                setHeadtitle('Attendance Logs');
                break;

            case '/employees' :
                setHeadtitle('Manage Employees');
                break;

            default:
                setHeadtitle('Dashboard');

        }
    }, [location.pathname]);





  return (

    
    <div className='headsection'>
        <div className="headtitle">
            {headtitle}
            
        </div>

        <div className="btn">
            
            {location.pathname === '/' && (<Button style={{ marginRight: '20px', borderRadius: 10 }} onClick={formOpen} variant="outlined">Add Employee</Button>)}
            
            <Button style={{ marginRight: '20px', borderRadius: 10 }} onClick={attendanceRoute} variant="outlined">Attendance Log</Button>


            <FormGroup>
             
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add a Employee
                        </Typography>
                        <Grid marginTop="10px" container spacing={2}>
                            {/* First row with three input fields */}
                            
                                
                                <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        label="Employee Name"
                                        name="employeeName"
                                        required
                                        value={empName}
                                        onChange={(e)=> setEmpName(e.target.value)}
                                    />
                                    </FormControl>
                                </Grid>
                                
                            
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            
                                <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                label="Employee Code"
                                                name="ecode"
                                                required
                                                value={ecode}
                                                type='number'
                                                onChange={(e)=>setEcode(e.target.value)}
                                            />
                                        </FormControl>
                                </Grid>
                            
                            

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    required
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <TextField
                                    fullWidth
                                    label="Salary / month"
                                    name="salary"
                                    required
                                    value={salary}
                                    onChange={(e)=>setSalary(e.target.value)}
                                    />
                                </FormControl>
                            
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        label="Hourly Salary"
                                        name="hourSalary"
                                        required
                                        value={hourSalary}
                                        onChange={(e)=>setHourSalary(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={unit}
                                        label="Unit"
                                        onChange={(e)=>setUnit(e.target.value)}
                                        >
                                        <MenuItem value={"Panki"}>U1</MenuItem>
                                        <MenuItem value={"Bhauti"}>U2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Shift</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={shift}
                                        label="Shift"
                                        onChange={(e)=>setShift(e.target.value)}
                                        >
                                        <MenuItem value={"Morning"}>Morning Shift</MenuItem>
                                        <MenuItem value={"Afternoon"}>Noon Shift</MenuItem>
                                        <MenuItem value={"Night"}>Night Shift</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    required
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="Status"
                                        onChange={(e)=>setStatus(e.target.value)}
                                        >
                                        <MenuItem value={"Active"}>Active</MenuItem>
                                        <MenuItem value={"Inactive"}>Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                                <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        label="Category"
                                        onChange={(e)=>setCategory(e.target.value)}
                                        >
                                        <MenuItem value={"Staff"}>Staff</MenuItem>
                                        <MenuItem value={"Worker"}>Worker</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                        </Grid>

                        
                        <Grid alignItems="center" marginTop="10px" container spacing={2}>
                            <Grid item xs={12} md={12} sm={12}>
                                <FormControl fullWidth>
                                    <Button size='large' onClick={handleAddEmployee} variant="outlined">Add Employee</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Modal>
            </FormGroup>
            
        </div>
    </div>
  )
}

export default HeadSection;