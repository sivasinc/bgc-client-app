import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// core components
// const styles = {
//   card: {
//     position: "relative",
//     display: "flex",
//     marginBottom: 20,
//   },
//   image: {
//     minWidth: 200,
//   },
//   content: {
//     padding: 25,
//     objectFit: "cover",
//   },
// };

const styles = (muiBaseTheme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
});

const CommunityCard = ({
  community,
  joinCommunityHandler,
  joinCommunityLoading,
}) => {
  const [updateCommunityId, setUpdatedCommunityId] = useState("");

  const joinCommunity = (communityId) => {
    setUpdatedCommunityId(communityId);
    joinCommunityHandler(communityId);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 330 , margin: "10px 10px 20px 11px", paddingBottom: "20px" }}>
        <CardHeader
          avatar={
            <Avatar            
              aria-label="recipe"
              alt="Remy Sharp"
              className="MyCommunity__body_item__image"
              src={community.image}
            />
          }
          title={community.name}
          subheader={
            community.members && Array.isArray(community.members)
              ? community.members.length + " Members"
              : 0 + " Members"
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {community.description}
          </Typography>
        </CardContent>

        {joinCommunityLoading && updateCommunityId === community.communityId ? (
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
        ) : (
          <Typography
            variant="h6"
            component={Link}
            onClick={() => joinCommunity(community.communityId)}
            color="primary"
            className="recommended__communityBox_community_join_button"
          >
            JOIN COUMMUNITY
          </Typography>
        )}

        {/* <CardActions>
          <Button size="medium">JOIN COUMMUNITY</Button>
        </CardActions> */}
      </Card>
    </div>
  );
};

CommunityCard.propTypes = {};

export default withStyles(styles)(CommunityCard);