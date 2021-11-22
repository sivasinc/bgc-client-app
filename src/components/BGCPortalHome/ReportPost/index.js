import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@mui/material/Button";
import {
  createCommunity,
  setCurrentCommunityId,
  addReportsPost,
} from "../../../redux/actions/dataActions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReportPostStep1 from "./ReportPostStep1";
import ReportPostStep2 from "./ReportPostStep2";
import { editUserDetails } from "../../../redux/actions/userActions";

const ReportPost = ({ email, article, addReports }) => {
  const [openModel, setOpenModel] = useState(false);
  const [commnunityProfile, setCommunityProfile] = useState({});
  const [selectedReport, setSelectedReport] = useState("violence");
  const [currentStep, setCurrentStep] = useState(0);

  console.log(article);
  console.log(" emailID---------------->" + email);

  const history = useHistory();

  const handleModelChange = (value) => {
    setOpenModel(value);
  };
 

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReportRadioChange = (event) => {
    setSelectedReport(event.target.value);
  };

  
  const formButtonHandler = (currentStep) => {
    const currentReport = {
      type: selectedReport !== undefined ? selectedReport : "",
      userId: email !== undefined ? email : "",
    };

     
    if (currentStep === 1) {
        addReports(article.postId, currentReport);
    }

    setCurrentStep(currentStep);

    if (currentStep > 1) {
      setOpenModel(false);
      setCurrentStep(0);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleModelChange(true)}>Report Post</MenuItem>
      </Menu>
      <Dialog
        open={openModel}
        onClose={() => setOpenModel(false)}
        PaperProps={{
          style: {
            width: "500px",
            maxWidth: "500px",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 1px 1px 0 rgb(0,0,0,0.14), 0 2px 1px -1px rgb(0,0,0,0.12), 0 1px 3px 0 rgb(0 ,0, 0,0.2)",
          },
        }}
      >
        <DialogTitle>Report Post</DialogTitle>
        <DialogContent>
          {/* {loadCurrentSection(currentStep)} */}
          {currentStep === 0 ? (
            <ReportPostStep1
              handleReportRadioChange={handleReportRadioChange}
              selectedReport={selectedReport}
            />
          ) : (
            <ReportPostStep2 />
          )}
        </DialogContent>

        <div className="__report__post__footer">
          <div className="signUp__footer__PrevBtn">
            {currentStep === 0 && (
              <Button onClick={() => setOpenModel(false)} color="primary">
                Cancel
              </Button>
            )}
          </div>
          <div className="signUp__footer__nextBtn">
            <Button
              variant="contained"
              color="primary"
              onClick={() => formButtonHandler(currentStep + 1)}
            >
              {currentStep === 0 ? "Submit" : "Close"}
            </Button>
          </div>
        </div>

        {/* <DialogActions>
          <Button onClick={() => setOpenModel(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

ReportPost.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
});


const mapDispatchToProps = (dispatch) => ({
    addReports: (postId, source) => dispatch(addReportsPost(postId,source))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ReportPost);
