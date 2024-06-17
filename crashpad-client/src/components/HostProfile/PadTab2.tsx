import React from "react";
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import HiddenEscape from '../../images/HiddenEscape.jpg'
// import Calendar from "./Calendar";
import { Link } from 'react-router-dom';


const PadTwo: React.FC = () => {

    const events = [
        {
            title: 'Jane Reservation',
            start: new Date(2024, 3, 14),
            end: new Date(2024, 3, 20),
        }
    ];

    return (
        <>
        <div style={{ display:'flex',gap:'50px' }}>
            <Link to="/property2info" > 
                <Card  sx={{ maxWidth: 500, maxHeight: 500 }}>
                    <CardMedia
                        sx={{ height: 250 }}
                        image={HiddenEscape}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                        Hidden Escape
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        City, State, Zip code | Distance
                        Stays | Rating
                        Request | Stays
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
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

export default PadTwo