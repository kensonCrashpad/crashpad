import { TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import CityScape from '../../images/CityScape.jpg';
import Lot10 from '../../images/Lot10.jpg';
import Lot11 from '../../images/Lot11.jpg';
import Lot9 from '../../images/Lot9.jpg';
import UserSettings from '../Dashboard/UserSettings';
import PropertyForm from './PropertyForm';
// import Calendar from './Calendar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Nav from '../NavBar/SideNav';


const SideBySide = styled('div')({
    display: 'flex',
    gap:'5px',
  })
  

interface UserFormState {
    location: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    about: string;
}

interface Property3Props {
    properties?: any; 
  }

const Property3: React.FC<Property3Props> = ({properties}) => {
    const [propertyFormData, setPropertyFormData] = useState<UserFormState>({
        location: 'City',
        address: '123 Main St',
        city: 'Cityville',
        state: 'CA',
        zip: 12345,
        about: "Quiety property with plenty of space."
    });

    const [errors, setErrors] = useState<any>();
    const [ShowProperty, setShowProperty] = useState(true);

    const validateForm = () => {
    
        let newErrors:any = {};
    
        if(!propertyFormData.location){
          newErrors.userName = "Location is required."
        }
        if(!propertyFormData.address){
          newErrors.firstName = "Address is required."
        }
        if(!propertyFormData.city){
          newErrors.lastName = "City is required."
        }
        if(!propertyFormData.state){
          newErrors.age = "State is required."
        }
        if(!propertyFormData.zip){
          newErrors.gender = "Zip Code is required."
        }
        if(!propertyFormData.about){
          newErrors.location = "Decription is required."
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
      }
    
      const propertySubmitData = (e:any) => {
        e.preventDefault();
        setShowProperty(false);

        const isValid = validateForm();
        
        if(isValid) {
          console.log("Form validation", propertyFormData);
        }else{
          setShowProperty(true);
          console.log("Form validation failed");
        }
      }
      const handleChange = (e:any) => {
        const {name, value} = e.target;
        console.log(name, value);

        setPropertyFormData({...propertyFormData, [name]:value});
      }
      const handleShowProperty = () => {
        setShowProperty(true);
      }

      const events = [
        {
            title: 'Black Out Dates',
            start: new Date(2024, 3, 1),
            end: new Date(2024, 3, 20),
        }
    ];



    const navigateToHprofile = () => {
        window.location.href = '/hostprofile'; 
    };

    return (   
        <>
            <UserSettings></UserSettings>
            <Nav></Nav>
            <Box sx={{ flexGrow: 1, m:4, paddingLeft:'10em'}} >
            <Grid container spacing={2}>
                <Grid xs={4} >
                  <img src={CityScape}  style={{ width: "90%", height: "80%", borderRadius: "20px" }} />
                  
                </Grid>
                {
                ShowProperty ? 
                (<PropertyForm  properties ={properties} profileFormData={propertyFormData}  onClickEdit={handleShowProperty}></PropertyForm>) : 
                (<Grid sx={{ mr:2,ml:2 }} >
                    <form noValidate autoComplete="off" onSubmit={propertySubmitData}>
                        <TextField
                            fullWidth
                            name="location" 
                            value={propertyFormData.location}
                            margin="normal"
                            id="location"
                            label="Location"
                            variant="outlined"
                            onChange={handleChange} 
                            helperText={errors ? errors.location : ""}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="address"
                            label="Address"
                            variant="outlined"
                            name='address' 
                            value={propertyFormData.address}
                            onChange={handleChange} 
                            helperText={errors ? errors.address : ""}
                        />
                        <SideBySide>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="city"
                            label="City"
                            variant="outlined"
                            name='city' 
                            value={propertyFormData.city}
                            onChange={handleChange} 
                            helperText={errors ? errors.city : ""}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="state"
                            label="State"
                            variant="outlined"
                            name='state' 
                            value={propertyFormData.state}
                            onChange={handleChange} 
                            helperText={errors ? errors.state : ""}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="zip"
                            label="Zip Code"
                            variant="outlined"
                            name='zip' 
                            value={propertyFormData.zip}
                            onChange={handleChange} 
                            helperText={errors ? errors.zip : ""}
                        />
                        </SideBySide>
                        <TextField
                            fullWidth
                            placeholder="Tell me about the property..."
                            multiline
                            margin="normal"
                            id="about"
                            label="About"
                            variant="outlined"
                            name="about" 
                            value={propertyFormData.about}
                            onChange={handleChange} 
                            rows={2}
                            maxRows={4}
                            helperText={errors ? errors.about : ""}
                        />

                        <Typography variant="body2" style={{ marginTop: '1em' }}>
                            
                        </Typography>
                    </form>
                </Grid>)}
                    {/* <Calendar
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        selectable
                        style={{ height: '400px' }}
                    /> */}
            </Grid>
            </Box>
            <button style={{paddingLeft:'8em'}}onClick={navigateToHprofile}>Back to Profile</button>
            <div style={{ display:'flex', gap:'50px', paddingLeft:'8em', paddingRight: '5em' }}>
                    <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
                        <CardMedia
                            sx={{width:400,height: 250 }}
                            image={Lot9}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Lot 1
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
                        <CardMedia
                            sx={{ width:400,height: 250 }}
                            image={Lot10}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Lot 2
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
                        <CardMedia
                            sx={{ width:400,height: 250 }}
                            image={Lot11}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Lot 3
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
                        <CardMedia
                            sx={{ width:400,height: 250 }}
                            image={Lot9}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                              Lot 4
                            </Typography>
                        </CardContent>
                    </Card>
            </div>
        </>
    );
}

export default Property3;