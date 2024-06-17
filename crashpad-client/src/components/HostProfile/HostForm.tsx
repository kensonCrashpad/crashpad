import React, {useState} from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


const LoginButton = styled(Button)({
    marginTop: '1em'
});

interface childProps {
    profileFormData:any,
    onClickEdit:() => void
}
  

const ShowUserProfile:React.FC<childProps> = ({profileFormData, onClickEdit   }) => {

    const [showUserProfileEdit, setShowUserProfileEdit] = useState(false)

    const profileSubmitData = () => {
      onClickEdit()
    }
    
    return (
        <>
        <Grid sx={{ mr:2,ml:2 }} >
            <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>User Name: </span>{profileFormData.userName}</p>
            <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Name: </span>{profileFormData.firstName} {profileFormData.lastName}</p>
            <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Gender: </span> {profileFormData.gender} </p>
            <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Age: </span> {profileFormData.age} years</p>
            <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Location: </span> {profileFormData.location}</p>
            <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>Email: </span> {profileFormData.email}</p>
            <p><span style={{ fontSize: '16px', fontWeight: 'bold' }}>About: </span> {profileFormData.aboutMe}</p>
            <LoginButton
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#FDA117' }}
                onClick={profileSubmitData}
            >
                Edit
            </LoginButton>
        </Grid>
        </>
    );
}

export default ShowUserProfile