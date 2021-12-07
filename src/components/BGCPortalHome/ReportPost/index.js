import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addReportsPost } from "../../../redux/actions/dataActions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReportPostStep1 from "./ReportPostStep1";
import ReportPostStep2 from "./ReportPostStep2";
import { ButtonGroup, Button } from "@mui/material";

const ReportPost = ({ email, article, addReports }) => {
  const [openModel, setOpenModel] = useState(false);
  const [selectedReport, setSelectedReport] = useState("violence");
  const [currentStep, setCurrentStep] = useState(0);

  console.log(article);
  console.log(" emailID---------------->" + email);

  const history = useHistory();

  const handleModelChange = (value) => {
    setOpenModel(value);
  };

  const handleDelete = (value) => {
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
        onClick={handleClose}
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

        <ButtonGroup
          style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
        >
          <div className="__report__post__footer">
            <div className="signUp__footer__PrevBtn">
              {currentStep === 0 && (
                <Button
                  onClick={() => setOpenModel(false)}
                  color="primary"
                  style={{ margin: "0 10px" }}
                  variant="outlined"
                >
                  CANCEL
                </Button>
              )}
            </div>
            <div className="signUp__footer__nextBtn">
              <Button
                color="primary"
                variant="contained"
                onClick={() => formButtonHandler(currentStep + 1)}
              >
                {currentStep === 0 ? "SUBMIT" : "CLOSE"}
              </Button>
            </div>
          </div>
        </ButtonGroup>
      </Dialog>
    </div>
  );
};

ReportPost.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  addReports: (postId, source) => dispatch(addReportsPost(postId, source)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportPost);
