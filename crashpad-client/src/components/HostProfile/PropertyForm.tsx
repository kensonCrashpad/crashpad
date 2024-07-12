


import React, { useState } from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import img from "./Myprofile.png"
import styled from "@emotion/styled";


const amenities = ["Wi-Fi","Electric Hookups","Water Hookups","Sewage Dump Station","Trash Disposal","Restrooms and Showers","Picnic Tables","Propane Refill Station","Pet-Friendly Areas", "Fire pit", "Laundry facilities","Campfire", "BBQ Available for use"];

const AmenitiesList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {amenities.map((amenity, index) => (
          <Grid item xs={6} key={index}>
            <span>{amenity}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const nearBy = ["Sewage Dump Station","Walking Trail","Shuttle Services","RV Maintenance Services","Recreational Facilities"];

const NearByList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {nearBy.map((near, index) => (
          <Grid item xs={6} key={index}>
            <span>{near}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const allowed = ["Pets","Kids","Genarators","BBQ"];

const AllowedList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {allowed.map((allow, index) => (
          <Grid item xs={6} key={index}>
            <span>{allow}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const securityAndSafety = ["Exterior security cameras on property","24/7 Security","Good Lighting","First Aid Station"];

const SecurityAndSafetlyList = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {securityAndSafety.map((safety, index) => (
          <Grid item xs={6} key={index}>
            <span>{safety}</span>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const CustomCard = styled(Card)({
  maxWidth: 450,
  height: "250px",
  borderRadius: "20px",
  padding:"20px"
});

interface childProps {
  profileFormData: any;
  onClickEdit: () => void;
}

const ShowProperty: React.FC<childProps> = ({
  profileFormData,
  onClickEdit,
}) => {
  const [showUserProfileEdit, setShowUserProfileEdit] = useState(false);

  const profileSubmitData = () => {
    onClickEdit();
  };

  return (
    <>
      <Grid textAlign={"left"}>
        <Typography variant="h4" fontWeight="700" textAlign={"left"}>
          {profileFormData.location}
        </Typography>
        <Typography variant="body1">
          {profileFormData.address}, {profileFormData.city}, {profileFormData.state}, {profileFormData.zip}
        </Typography>
        <Typography variant="body1">
          <GradeIcon style={{ marginTop: "5px" }} /> <span>4.79</span> <span style={{ textDecoration: "underline" }}><a>  #20 reviews</a></span>
        </Typography><br />
        <hr />
        <Typography variant="body1" style={{ display: "flex", alignItems: "center" }}>
          <img src={img} alt="Profile" style={{ height: "40px", width: "40px", borderRadius: "50%", marginRight: "10px" }} />
          <Box>
            <Typography variant="body1" fontWeight="700">Hosted by Harsha</Typography>
            <Typography variant="body2" color="textSecondary">2 years hosting</Typography>
          </Box>
        </Typography>
        <br />
        
        <Typography variant="body1" marginTop={"10px"}>
          <span style={{ fontWeight: "700" }}>About Property  <hr /></span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque eum vel maiores facere ipsum vitae fugit fugiat, quam temporibus rem labore officiis. Natus velit harum perferendis voluptatibus tempore consectetur minima at laudantium vel, eos, voluptas molestiae autem libero saepe asperiores, nesciunt nulla dicta officiis? Voluptate eius esse hic aspernatur debitis officiis, magni nulla tempore ducimus suscipit veniam labore sint excepturi, sed asperiores consequuntur sapiente ratione totam a animi? Aut dolore natus nisi fugiat minima excepturi beatae voluptate similique maiores at necessitatibus ut numquam porro cupiditate delectus, hic modi quos rem id dolorem corporis facere dignissimos magnam! Blanditiis iusto culpa autem architecto deserunt asperiores accusantium, sint libero ullam laboriosam voluptatibus facilis fuga itaque dignissimos ab et magni nam provident iure vero quasi atque. Minus nobis voluptate, voluptatem esse aliquam sint numquam dolorem earum libero dolor modi, hic quia eveniet quaerat? Consequatur cum ea totam, nemo soluta at eligendi rem error quas est sit ratione illo porro perspiciatis? Assumenda enim dignissimos impedit eveniet nemo id reprehenderit debitis natus, cumque sed suscipit est harum velit? Qui nobis doloribus voluptates asperiores explicabo nihil dolor accusantium cum est corporis quam, vitae, mollitia, animi repellendus in inventore architecto. Et exercitationem facere recusandae, atque dicta, unde quasi pariatur enim est in rem quos suscipit vel saepe ab ipsa quod ipsum ratione. Ea, unde veritatis atque quos a impedit nesciunt ex officiis error tenetur explicabo necessitatibus ipsum similique hic dignissimos minima dicta ducimus libero minus! Ipsa laboriosam, adipisci optio obcaecati id, impedit expedita vel mollitia at voluptates dignissimos consectetur cumque magni accusantium soluta doloremque natus delectus consequatur? Nam, enim molestiae minus porro nesciunt dignissimos error quibusdam nostrum facilis quis illo ex assumenda vero suscipit quisquam sit ducimus iste aperiam fugit. Distinctio et sit ipsum inventore nisi voluptates nemo, expedita impedit excepturi! A ipsam maxime, minus omnis cum nemo! Officiis aut, dolor ad obcaecati voluptate modi nam totam architecto odio nemo, qui expedita et porro voluptatum consequuntur quae fugit exercitationem eligendi suscipit magni est autem, optio ducimus. Repellendus earum voluptate ipsam distinctio, pariatur quos exercitationem animi commodi aut voluptas consectetur laboriosam excepturi repudiandae quo odit amet tempore itaque minus. Provident officiis voluptates doloremque quibusdam eveniet amet nobis quo? Corrupti veniam quidem aperiam aliquid adipisci corporis aliquam doloremque laborum quibusdam expedita unde ex molestiae laudantium, natus eaque animi alias eligendi. Sit porro, voluptatem nesciunt labore eos, itaque illo voluptas incidunt atque, omnis est. Modi nesciunt velit atque non asperiores pariatur, repellendus, suscipit magni impedit voluptas repellat iste explicabo sint. Temporibus iusto assumenda commodi odio eaque facilis magnam animi cupiditate, fuga omnis officia debitis doloremque rem aliquam qui veniam illum ad rerum molestiae cumque neque quibusdam enim atque voluptas! Tempora totam voluptas quod, dicta consectetur, facilis cupiditate officia minima beatae corrupti itaque, enim ut nemo accusamus omnis aperiam sed sapiente optio qui a assumenda? Sapiente minus eos quisquam velit, libero harum quo cumque quidem eius, provident odit adipisci eveniet atque non ipsa. Ex expedita ab tempora modi blanditiis laudantium voluptatum dolores libero dignissimos tenetur doloremque, qui eum voluptates, dolore, adipisci repellat.
        </Typography><br />
        <hr />
        <Typography variant="body1" fontWeight="700">
          What this place provides
        </Typography>
        <br />
        <AmenitiesList />
        <br />
        <Typography variant="body1" fontWeight="700">
          Allowed
        </Typography><br />
        <AllowedList/><br />
        <Typography variant="body1" fontWeight="700">
          Near By
        </Typography><br />
        <NearByList /><br />
        <Typography variant="body1" fontWeight="700">
          Security and Safety
        </Typography><br />
        <SecurityAndSafetlyList/><br />
        
        <Typography variant="body1" fontWeight="700" style={{marginTop:"20px"}}>
          Host Details
        </Typography><hr />
        <CustomCard>
        <Typography variant="body1" style={{ display: "flex"}}>
          <img src={img} alt="Profile" style={{ height: "250px", width: "250px", borderRadius: "10px", marginRight: "10px" }} />
          <Box style ={{ margin: "auto", }}>
            <Typography variant="body1" fontWeight="700">Verified Host</Typography><br />
            <Typography variant="body2" color="textSecondary">Harsha</Typography><br />
            <Typography variant="body2" color="textSecondary">Hosting since 2 years</Typography><br />
            <Typography variant="body2" color="textSecondary">See rating of Harsha</Typography><br />
            <Typography variant="body2" color="textSecondary">View Reviews</Typography>
          </Box>
        </Typography>
        </CustomCard><br />
        {/* <hr /> */}
        <Typography variant="body1" fontWeight="800" style={{marginTop:"20px"}}>
          Reviews
        </Typography>
        <hr />

      </Grid>
    </>
  );
};

export default ShowProperty;
