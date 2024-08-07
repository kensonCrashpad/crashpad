import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import crashPadImg2 from "../../images/Lot2.jpg";
import crashPadImg3 from "../../images/Lot3.jpg";
import crashPadImg1 from "../../images/rvpark4.jpeg";
import StarRating from "../Traveller/Rating";

const CurrentBooking: React.FC = () => {
  return (
    <>
      <div style={{ display: "flex", gap: "8px" }}>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={crashPadImg1}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Heaven On Earth Moab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Moab, UT 84055 | 2,600 miles away 15-20 September | $95 per night
              <StarRating />
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={crashPadImg2}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Yellowstone Retreat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Idaho, WY, 67095 | 2,800 miles away 10-15 July | 4.3 $120 per
              night
              <StarRating />
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={crashPadImg3}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Grand Teton Camp
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Moab, UT 84055 | 2,600 miles away 15-20 September | $95 per night
              <StarRating />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CurrentBooking;
