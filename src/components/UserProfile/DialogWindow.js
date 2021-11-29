import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@material-ui/core/Avatar";
import "./DialogWindow.css";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const DialogWindow = ({
  handleModal,
  myCommunities,
  communityClickHandler,
}) => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div>
      <Grid container>
        {myCommunities
          .slice((page-1) * rowsPerPage, page * rowsPerPage )
          .map((item) => (
            <Grid item sm={6}>
              <Box>
                <div className="content_body">
                  <Avatar
                    alt={item.name}
                    sx={{ width: 24, height: 24 }}
                    className="MyNetworks__body_item__image"
                    src={item.image}
                  />
                  <div className="item_description">
                    <p>
                      <Link
                        to={`/communityHome/${item.communityId}`}
                        onClick={() => communityClickHandler(item.communityId)}
                      >
                        {item.name}
                      </Link>
                    </p>
                    {/* <Typography variant='p'>{item.description}</Typography> */}
                  </div>
                </div>
              </Box>
            </Grid>
          ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={myCommunities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </div>
  );
};

export default DialogWindow;
