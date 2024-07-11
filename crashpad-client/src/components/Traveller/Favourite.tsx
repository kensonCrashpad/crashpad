import React from "react";
import { IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import crashPadImg1 from "../../images/rvpark4.jpeg";
import crashPadImg2 from "../../images/Lot2.jpg";
import crashPadImg3 from "../../images/Lot3.jpg";
import crashPadImg4 from "../../images/Lot4.jpg";
import crashPadImg5 from "../../images/Lot5.jpg";
import StarRating from "../Traveller/Rating";

const Favourite: React.FC = () => {
  return (
    <>
      <div style={{ display: "flex", gap: "8px" }}>
        <Card sx={{ maxWidth: 400 }}>
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
        <Card sx={{ maxWidth: 400 }}>
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
        <Card sx={{ maxWidth: 400 }}>
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
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={crashPadImg4}
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
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            sx={{ height: 150 }}
            image={crashPadImg5}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Indian Peaks RV Park
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cedar City, UT | 2,600 miles away 20 August | $75 per night
              <StarRating />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Favourite;
