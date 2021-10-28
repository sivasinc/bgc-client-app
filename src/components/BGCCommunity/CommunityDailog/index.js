import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import { createCommunity } from "../../../redux/actions/dataActions";
import InfoIcon from "@mui/icons-material/Info";

const CommunityCreateDailog = ({ user : { userInfo }, createCommunity }) => {
  const [openModel, setOpenModel] = useState(false);
  const [commnunityProfile, setCommunityProfile] = useState({});
  const history = useHistory();
  const handleChange = (event) => {
    setCommunityProfile({ ...commnunityProfile, [event.target.name]: event.target.value });
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
      tags: tags.split(','),
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/${noImg}?alt=media`,
      members: [{ email, firstName, imageUrl }],
      createdAt: new Date().toISOString()
    }
    createCommunity(newCommunity, history );
    setOpenModel(false);
  };

  const { name, description, tags } = commnunityProfile;
  return (
    <div>
      <div>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2877d3" }}
          //  onClick={handleModelChange}
          onClick={() => handleModelChange(true)}
        >
          CREATE A COMMUNITY
        </Button>
      </div>
      <div className="create_community_container">
        <Dialog
          open={openModel}
          onClose={() => setOpenModel(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Create a Community</DialogTitle>
          <DialogContent>
            <form>
              <div>
                <TextField
                  name="name"
                  tpye="text"
                  label="Create Community"
                  value={name}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  name="description"
                  tpye="text"
                  label="Description"
                  value={description}
                  rows="3"
                  multiline
                  onChange={handleChange}
                  fullWidth
                />{" "}
              </div>
              <div>
                <TextField
                  name="tags"
                  type="text"
                  label="Tags"
                  placeholder="Tags"
                  value={tags}
                  onChange={handleChange}
                  fullWidth
                  helperText="Make it easier for other members to find this community by entering meaningful keywords."
                />
              </div>
              <div className="create_community_agree_message">
                <InfoIcon style = {{ marginRight: '10px' }}/>
                By proceeding to create this community, you agree to abide by
                the guidelines established for the Black Girls Code Alumnae
                Portal.
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