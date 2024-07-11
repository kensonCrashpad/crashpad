import React from "react";
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import crashPadImg from '../../images/Pad1.jpg';
import rvpark1 from '../../images/rvpark1.jpg';
import rvpark2 from '../../images/rvpark2.jpg';
import rvpark3 from '../../images/rvpark3.jpg';
import rvpark4 from '../../images/rvpark4.jpeg';
import rvpark5 from '../../images/rvpark5.jpg';
import StarRating from "../Traveller/Rating";

const PastBooking: React.FC = () => {



    return (
        <>
        <div style={{ display:'flex',gap:'8px' }}>
        <Card  sx={{ maxWidth: 400 }}>
            <CardMedia
                sx={{ height: 150}}
                image={rvpark1}
                title="green iguana"
            />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                Heaven On Earth Moab   
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Moab, UT 84055 | 2,600 miles away
                15-20 September | 
                $95 per night
                <StarRating/>
                </Typography>
            </CardContent>
             </Card>
             <Card  sx={{ maxWidth: 400 }}>
            <CardMedia
                sx={{ height: 150 }}
                image={rvpark2}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                Yellowstone Retreat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Idaho, WY, 67095 | 2,800 miles away
                10-15 July | 4.3
                $120 per night
                <StarRating/>
                </Typography>
            </CardContent>
        </Card>
        <Card  sx={{ maxWidth: 400 }}>
            <CardMedia
                sx={{ height: 150 }}
                image={rvpark3}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                Grand Teton Camp
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Moab, UT 84055 | 2,600 miles away
                15-20 September | 
                $95 per night
                <StarRating/>
                </Typography>
            </CardContent>
        </Card>
        <Card  sx={{ maxWidth: 400 }}>
            <CardMedia
                sx={{ height: 150 }}
                image={rvpark4}
                title="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                Grand Teton Camp
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Moab, UT 84055 | 2,600 miles away
                15-20 September | 
                $95 per night
                <StarRating/>
                </Typography>
            </CardContent>
            
        </Card>
        <Card  sx={{ maxWidth: 400 }}>
            <CardMedia
                sx={{ height: 150}}
                image={rvpark5}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                Indian Peaks RV Park
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Cedar City, UT | 2,600 miles away
                20 August | 
                $75 per night
                <StarRating/>
                </Typography>
            </CardContent>
        </Card>
        
        </div>
        </>
    );
}
export default PastBooking