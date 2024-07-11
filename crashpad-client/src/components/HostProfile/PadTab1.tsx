import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import CountryEscape from "../../images/CountryEscape.jpg";
// import Calendar from "./Calendar";

const PadOne: React.FC = () => {
  const events = [
    {
      title: "Reserved",
      start: new Date(2024, 3, 21),
      end: new Date(2024, 3, 27),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", gap: "50px" }}>
        <Link to="../property1info">
          {" "}
          <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
            <CardMedia
              sx={{ height: 250 }}
              image={CountryEscape}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Yellowstone Retreat
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Idaho, WY, 67095 | 2,800 miles away 10-15 July | 4.3 $120 per
                night
              </Typography>
            </CardContent>
          </Card>
        </Link>

        {/* <Calendar
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          style={{ height: "350px" }}
        /> */}
      </div>
    </>
  );
};

export default PadOne;
