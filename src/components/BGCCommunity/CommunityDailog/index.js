import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { createCommunity } from "../../../redux/actions/dataActions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import "./CommunityForm.css";

const CommunityCreateDailog = ({
  user: { userInfo },
  createCommunity,
  props,
}) => {
  const { ...other } = props;
  const [openModel, setOpenModel] = useState(false);
  const [commnunityProfile, setCommunityProfile] = useState({});
  const history = useHistory();
  const handleChange = (event) => {
    setCommunityProfile({
      ...commnunityProfile,
      [event.target.name]: event.target.value,
    });
  };
  const handleModelChange = (value) => {
    setOpenModel(value);
  };
  const handleSubmit = () => {
    const { name, description, tags } = commnunityProfile;
    const { email, firstName, imageUrl } = userInfo;
    const noImg = "no-img.png";
    const newCommunity = {
      name,
      description,
      tags: tags.split(","),
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/${noImg}?alt=media`,
      members: [{ email, firstName, imageUrl }],
      createdAt: new Date().toISOString(),
      createdMember:email,
    };
    createCommunity(newCommunity, history);
    setOpenModel(false);
  };

  const { name, description, tags } = commnunityProfile;
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => handleModelChange(true)}
        color="primary"
      >
        CREATE A COMMUNITY
      </Button>
      <Dialog
        open={openModel}
        onClose={() => setOpenModel(false)}
        PaperProps={{
          style: {
            width: "780px",
            height: "600px",
            maxWidth: "780px",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 1px 1px 0 rgb(0,0,0,0.14), 0 2px 1px -1px rgb(0,0,0,0.12), 0 1px 3px 0 rgb(0 ,0, 0,0.2)",
          },
        }}
      >
        <DialogTitle>Create a Community</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              className="communityCreate__form__page"
              required
              // error={!!errorMessage.firstName}
              name="name"
              id="outlined-required"
              label="Create Community"
              value={name}
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              className="communityCreate__form__page"
              required
              // error={!!errorMessage.firstName}
              name="description"
              id="outlined-required"
              label="Description"
              value={description}
              variant="outlined"
              onChange={handleChange}
              rows="5"
              multiline
              fullWidth
            />
            <div>
              <TextField
                className="communityCreate__form__page"
                required
                // error={!!errorMessage.firstName}
                name="tags"
                id="outlined-required"
                label="Tags"
                value={tags}
                variant="outlined"
                onChange={handleChange}
                placeholder="Tags"
                fullWidth
                helperText="Make it easier for other members to find this community by entering meaningful keywords."
              />
            </div>
            {/* <div className="__create__community__agree__div">
              <Alert variant="outlined" severity="error"> 
                <span className="create__community__agree__message">
                  By proceeding to create this community, you agree to abide by
                  the guidelines established for the Black Girls Code Alumnae
                  Portal.
                </span>
              </Alert>
            </div> */}
            <div className="__create__community__agree__div">
              <InfoOutlinedIcon />
              <span className="create__community__agree__message">
                By proceeding to create this community, you agree to abide by
                the guidelines established for the Black Girls Code Alumnae
                Portal.
              </span>
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModel(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CommunityCreateDailog.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { createCommunity };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityCreateDailog);
