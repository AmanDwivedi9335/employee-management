import axios from 'axios';
import React, { useEffect, useId, useState } from 'react';
import './style.scss';
import dayjs from 'dayjs';

function AttendanceLog({ child, date }) {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = useId();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://ontimeemployeemanager.com/ONtimeIntegration/Service/Attendance/EmployeeAttendance_DateWise', {
                    params: {
                        AttendenceDate: date.format('YYYY-MM-DD'),
                        CloudId: 'beechems',
                        IntegrationKey: 'p;xS|34*x62z'
                    }
                });

                console.log('API response:', response.data); // Debugging API response

                if (response.data.STATUS === "true") {
                    const processedData = processAttendance(response.data.Data);
                    setAttendanceData(processedData);
                    console.log('Processed Data:', processedData); // Debugging processed data
                } else {
                    setError('Error: Invalid response from server');
                }
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            }
            setLoading(false);
        };

        fetchData();
    }, [date]);

    const processAttendance = (data) => {
        const processData = [];
        const employeeMap = new Map();

        data.forEach(record => {
            const employeeName = record['Employee Name'];
            const employeeCode = record['Employee Code'];
            const punchDirection = record['Punch Direction'];
            const punchTime = new Date(record['Punch Time']);

            if (employeeName) {
                if (!employeeMap.has(employeeName)) {
                    employeeMap.set(employeeName, {employeeCode, punches: []});
                }
                employeeMap.get(employeeName).punches.push({ punchTime, punchDirection });
            }
        });

        employeeMap.forEach((value, employeeName) => {
            const { employeeCode, punches} = value;
            if (punches.length > 1) {
                for (let i = 0; i <= punches.length - 1; i += 2) {
                    processData.push({
                        id: `${employeeName}-${i}`,
                        employeeName,
                        employeeCode,
                        punchIn: punches[i].punchDirection === 'PUNCH IN' ? punches[i].punchTime : (punches[i + 1] && punches[i + 1].punchTime),
                        punchOut: punches[i + 1] && punches[i + 1].punchDirection === 'PUNCH OUT' ? punches[i + 1].punchTime : (punches[i].punchTime)
                    });
                }
            } else if (punches.length === 1) {
                processData.push({
                    id: `${employeeName}-0`,
                    employeeName,
                    employeeCode,
                    punchIn: punches[0].punchDirection === 'PUNCH IN' ? punches[0].punchTime : '-',
                    punchOut: punches[0].punchDirection === 'PUNCH OUT' ? punches[0].punchTime : '-'
                });
            }
        });

        return processData;
    };

    return (
        <div>
            {child}
            <div className='attendanceLog'>
                <h2>Attendance Log for {date.format('YYYY-MM-DD')}</h2>
                <table id="customers">
                    <thead>
                        <tr key={id}>
                            <th width="5px">Sr.</th>
                            <th>Employee Code</th>
                            <th>Employee Name</th>
                            <th>Punch In</th>
                            <th>Punch Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr key={id}>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : (
                            attendanceData.map((record, index) => (
                                <tr key={record.id}>
                                    <td>{index + 1}</td>
                                    <td>{record.employeeCode}</td> 
                                    <td>{record.employeeName}</td>
                                    <td>{record.punchIn instanceof Date ? record.punchIn.toLocaleString() : record.punchIn}</td>
                                    <td>{record.punchOut instanceof Date ? record.punchOut.toLocaleString() : record.punchOut}</td>

                                </tr>
                            ))
                        )}
                        {error && (
                            <tr key="error">
                                <td colSpan="4">{error}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AttendanceLog;
