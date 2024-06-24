import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEmployeeContext } from '../../components/contextprovider/EmployeeContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const CardBlock = ({ heading, value }) => {
  return (
    <Card sx={{ marginTop: 5, marginLeft: 2, minWidth: "auto", maxWidth: 300, display: 'inline-block', borderRadius: 5 }}>
      <CardActions>
        <CardContent sx={{ marginleft: 2, display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center" }}>
          <Typography sx={{display: "flex", justifyContent:"center", alignItems: "center"}} variant="h5" component="div">
            {heading}
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {value}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
};

function MainDash() {
  const { totals } = useEmployeeContext();

  const data = {
    labels: ['Total Employees', 'Active Employees', 'Inactive Employees', 'Workers Count'],
    datasets: [
      {
        label: '# of Employees',
        data: [totals.totalEmployees, totals.activeEmployees, totals.inactiveEmployees, totals.workerEmployees],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <CardBlock heading="Total Employees" value={totals.totalEmployees} />
      <CardBlock heading="Active Employees" value={totals.activeEmployees} />
      <CardBlock heading="Inactive Employees" value={totals.inactiveEmployees} />
      <CardBlock heading="Workers Count" value={totals.workerEmployees} />
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <Pie data={data} />
      </div>
    </>
  );
}

export default MainDash;
