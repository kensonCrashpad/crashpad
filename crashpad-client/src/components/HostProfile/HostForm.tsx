import React from 'react';
import { TextField, Grid } from '@mui/material';

interface HostFormProps {
  profileFormData: any;
}

const HostForm: React.FC<HostFormProps> = ({ profileFormData }) => {
  return (
    <Grid sx={{ mr: 2, ml: 2 }}>
      <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>User Name: </span>{profileFormData.userName}</p>
      <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Name: </span>{profileFormData.firstName} {profileFormData.lastName}</p>
      <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Gender: </span> {profileFormData.gender} </p>
      <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Age: </span> {profileFormData.age} years</p>
      <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Email: </span> {profileFormData.email}</p>
      <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>About: </span> {profileFormData.aboutMe}</p>
    </Grid>
  );
}

export default HostForm;
