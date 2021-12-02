import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@material-ui/core/Avatar";
import "./DialogWindow.css";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const DialogWindow = ({
  handleModal,
  myCommunities,
  communityClickHandler,
  openModal,
  noOfPages,
}) => {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 10;
  // const [totalPages] = React.useState(
  //   noOfPages
  // );
  let string = "";
  const changeDescription = (description) => {
    return (string = description.substring(0, 40) + "...");
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };
  return (
    <Dialog open={openModal} fullWidth>
      <DialogTitle>
        <div className="MyCommunity__heading">
          <div className="MyCommunity__header">
            <h3>My Communities</h3>
          </div>
          <div className="MyNetworks__header__right">
            <span>{myCommunities.length} Communities</span>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          {myCommunities
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((item) => (
              <Grid item sm={12}>
                <Box>
                  <div className="content_body">
                    <Avatar
                      alt={item.name}
                      sx={{ width: 30, height: 30 }}
                      className="MyNetworks__body_item__image"
                      src={item.image}
                    />
                    <div className="item_description">
                      <div>
                        <Typography
                          variant="h6"
                          component={Link}
                          to={`/communityHome/${item.communityId}`}
                          onClick={() =>
                            communityClickHandler(item.communityId)
                          }
                          className="community_title"
                        >
                          {item.name}
                        </Typography>
                      </div>
                      <Typography variant="p">
                        {item.description.length > 40
                          ? changeDescription(item.description)
                          : item.description}
                      </Typography>
                    </div>
                  </div>
                </Box>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions className="action_content">
        <Pagination
          className="pagination_div"
          rowsPerPageOptions={[]}
          component="div"
          count={noOfPages}
          rowsPerPage={itemsPerPage}
          page={page}
          onChange={handleChangePage}
        />
        <Button onClick={handleModal} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
