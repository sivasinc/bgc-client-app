import React, {useState} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { editUserDetails } from '../../redux/actions/userActions';
import { uploadProfileImage } from '../../redux/actions/postActions';

import "./BGCProfileHome.css";

const ProfileHeader = ({user: { userInfo }, editUserDetails, uploadProfileImage }) => {
    const {firstName, lastName, email, profileInfo, headLine, location } = userInfo;
  const [openModel, setOpenModel] = useState(false);
  const [profile, setProfile] = useState({
  });

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name] : event.target.value });
  }
  const handleModelChange = (value) => {
    setProfile({
      updatedFirstName: firstName, updatedLastName: lastName, updatedHeadLine: headLine, updatedLocation, location
    })
    setOpenModel(value);
  }
  const handleSubmit = () => {
    const {updatedFirstName, updatedLastName, updatedLocation, updatedHeadLine } = profile;
    const userDetails = {
      firstName: updatedFirstName !== undefined ? updatedFirstName : firstName,
      lastName: updatedLastName !== undefined ? updatedLastName : lastName,
      location: updatedLocation !== undefined ? updatedLocation : location,
      headLine: updatedHeadLine !== undefined ? updatedHeadLine : headLine 
    };
    const request = { ...userInfo, ...userDetails}
    editUserDetails(request);
    setOpenModel(false);
  }

 const handleImageUploadClick = (e) => {
  const image = e.target.files[0];

  if (image === "" || image === undefined) {
    alert(`not an image, the file is a ${typeof image}`);
    return;
  }
  uploadProfileImage(image, userInfo);
 }
  const {updatedFirstName, updatedLastName, updatedLocation, updatedHeadLine } = profile;
  const { imageUrl } = userInfo;
    return (
        <div>
             <div className="profile__header">
          <div className="profile__header__main__container">
            <div className="profile__header__main">
            <input
              accept="image/gif, image/jgp, image/png, image/jpeg"
              id="contained-button-file"
              style={{ display: "none" }}
              multiple
              type="file"
              onChange={handleImageUploadClick}
            />
            <label htmlFor="contained-button-file">
            <Avatar
                alt="Remy Sharp"
                className="profile__header__image"
                src={imageUrl}
              />
              <AddAPhotoIcon className="profileAdd"/>    
            </label>  
                        
              <div className="profile__user">
                <h2>{`${firstName}  ${lastName}`}</h2>
                {headLine === undefined ? <p>No Headline added</p>: <p>{headLine}</p>}
                {location === undefined ? <p>No Location added</p>: <p>{`${location} , United States`}</p>}
              </div>
            </div>
            <div className="profile__header__main__container">
              <div className="profile__user__edit" onClick={() => handleModelChange(true)}>
                {" "}
                <EditIcon color="primary"/>
                <p>EDIT PROFILE</p>
              </div>
            </div>
          </div>
          <div className="profile__user_bar">
            <div className="profile__user_bar_left">
              <p>Email : </p>{" "}
              <p className="profile__user_bar_left__value">{email}</p>
            </div>
            <div className="profile__user_bar_right">
              <p>Social :</p>{" "}
              <p className="profile__user_bar_left__value">Linked In</p>{" "}
              <p className="profile__user_bar_left__value">Twitter</p>
              <p className="profile__user_bar_left__value">Facebook</p>
            </div>
          </div>
        </div>
        <Dialog
          open={openModel}
          onClose={() => setOpenModel(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="updatedFirstName"
                tpye="text"
                label="FirstName"
                multiline
                rows="3"
                value={updatedFirstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="updatedLastName"
                tpye="text"
                label="LastName"
                value={updatedLastName}
                onChange={handleChange}
                fullWidth
              />
               <TextField
                name="updatedHeadLine"
                tpye="text"
                label="Headline"
                value={updatedHeadLine}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="updatedLocation"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                value={updatedLocation}
                onChange={handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModel(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )
}

ProfileHeader.propTypes = {

}
const mapStateToProps = (state) => ({
  user: state.user
});
const mapDispatchToProps = { editUserDetails, uploadProfileImage };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
