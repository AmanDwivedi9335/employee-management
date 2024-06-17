import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEmployeeContext } from '../../components/contextprovider/EmployeeContext';

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

  return (
    <>
      <CardBlock heading="Total Employees" value={totals.totalEmployees} />
      <CardBlock heading="Active Employees" value={totals.activeEmployees} />
      <CardBlock heading="Inactive Employees" value={totals.inactiveEmployees} />
      <CardBlock heading="Workers Count" value={totals.workerEmployees} />
    </>
  );
}

export default MainDash;
