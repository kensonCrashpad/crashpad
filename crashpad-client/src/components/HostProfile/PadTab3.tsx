import React from "react";
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CityScape from '../../images/CityScape.jpg'
// import Calendar from "./Calendar";
import { Link } from 'react-router-dom';


const PadThree: React.FC = () => {

    const events = [
        {
            title: 'Black Out Dates',
            start: new Date(2024, 3, 1),
            end: new Date(2024, 3, 20),
        }
    ];

    return (
        <>
        <div style={{ display:'flex',gap:'50px' }}>
            <Link to="/property3info"> 
                <Card  sx={{ maxWidth: 500, maxHeight: 500 }}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image={CityScape}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                        City Scape
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        City, State, Zip code | Distance
                        Stays | Rating
                        Request | Stays
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
            {/* Calendar component */}
            {/* <Calendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                style={{ height: '350px' }}
            /> */}
            
        </div>
        </>
    );
}

export default PadThree