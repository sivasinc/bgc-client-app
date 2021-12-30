import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { editUserDetails } from "../../redux/actions/userActions";
import { uploadProfileImage } from "../../redux/actions/postActions";
import "./BGCProfileHome.css";
import { InputAdornment } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { statuss } from "../../util/constant";
import { MenuItem } from "@mui/material";
import Chip from '@mui/material/Chip';

const ProfileHeader = ({
  user: { userInfo, selectedMember },
  readOnlyFlow,
  editUserDetails,
  uploadProfileImage,
}) => {
  const [openModel, setOpenModel] = useState(false);
  const [openSocialModel, setOpenSocialModel] = useState(false);
  const { socialLinks, profileStatus } = userInfo;  
  
  const [profile, setProfile] = useState({ updatedSocialLinks: socialLinks, updatedProfileStatus: profileStatus });
  const [profileVisibility, setProfileVisibility] = useState(false);
  // const [updatedSocialLinks, setpdatedSocialLinks] = useState({LinkedIn: '', Facebook: '',Twitter:''});
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handleModelChange = (value) => {
    const {
      firstName,
      lastName,
      email,
      profileInfo,
      headLine,
      location,
      profileVisibletoAlumnaeCommunity,
    } = userInfo;
    setProfile({
      ...profile,
      updatedFirstName: firstName,
      updatedLastName: lastName,
      updatedHeadLine: headLine,
      updatedLocation: location,
      updatedEmail: email,
      updatedProfileVisibletoAlumnaeCommunity: profileVisibletoAlumnaeCommunity,
    });

    setOpenModel(value);
  };
  const handleSocialModelClick = (value) => {
    const { updatedSocialLinks } = profile;
    if (updatedSocialLinks[value]) {
      window.open(updatedSocialLinks[value]);
    }
  };
  const handleSocialModelChange = (event) => {
    // setSocialLinks({
    //   [socialkey]:value
    // })

    // window.open('https://www.linkedin.com/in/sivaprasad-s-b01740166/')
    setProfile({
      ...profile,
      updatedSocialLinks: {
        ...profile.updatedSocialLinks,
        [event.target.name]: event.target.value,
      },
      
    });
  };
  // const handleSocialSubmit=()=>{
  //   const {sociallink}=profile;
  //   setSocialLinks({
  //       [openSocialModel]:sociallink
  //     })
  //     setOpenSocialModel('');
  // }
  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      profileInfo,
      headLine,
      location,
      profileVisibletoAlumnaeCommunity,
    } = userInfo;

    const {
      updatedFirstName,
      updatedLastName,
      updatedLocation,
      updatedHeadLine,
      updatedEmail,
      updatedProfileVisibletoAlumnaeCommunity,
      updatedSocialLinks,
      updatedProfileStatus,
    } = profile;
    const userDetails = {
      firstName: updatedFirstName !== undefined ? updatedFirstName : firstName,
      lastName: updatedLastName !== undefined ? updatedLastName : lastName,
      location:
        updatedLocation !== undefined ? updatedLocation : location || "",
      headLine:
        updatedHeadLine !== undefined ? updatedHeadLine : headLine || "",
      email: updatedEmail !== undefined ? updatedEmail : email,

      profileVisibletoAlumnaeCommunity:
        updatedProfileVisibletoAlumnaeCommunity !== undefined
          ? updatedProfileVisibletoAlumnaeCommunity
          : profileVisibletoAlumnaeCommunity || "",
      socialLinks: updatedSocialLinks,
      profileStatus: updatedProfileStatus,
    };
    const request = { ...userInfo, ...userDetails };
    
    editUserDetails(request);
    setOpenModel(false);
  };
  const handleProfileVisibility = (event) => {
    
  };

  const handleImageUploadClick = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    uploadProfileImage(image, userInfo);
  };
  const {
    updatedFirstName,
    updatedLastName,
    updatedLocation,
    updatedHeadLine,
    updatedEmail,
    updatedProfileVisibletoAlumnaeCommunity,
    updatedSocialLinks = { LINKEDIN: "", FACEBOOK: "", TWITTER: "" },
    updatedProfileStatus,
  } = profile;
 
  let info = {};
  if (readOnlyFlow) {
    const {
      firstName,
      lastName,
      email,
      headLine,
      location,
      imageUrl,
      profileVisibletoAlumnaeCommunity,
    } = selectedMember;
    info = {
      firstName,
      lastName,
      email,
      headLine,
      location,
      imageUrl,
      profileVisibletoAlumnaeCommunity,
    };
  } else {
    const {
      firstName,
      lastName,
      email,
      headLine,
      location,
      imageUrl,
      profileVisibletoAlumnaeCommunity,
    } = userInfo;
    info = {
      firstName,
      lastName,
      email,
      headLine,
      location,
      imageUrl,
      profileVisibletoAlumnaeCommunity,
    };
  }
  
  
  return (
    <div>
      <div className="profile__header">
        <div className="profile__header__main__container">
          <div className="profile__header__main">
          {!readOnlyFlow && ( <input
              accept="image/gif, image/jgp, image/png, image/jpeg"
              id="contained-button-file"
              style={{ display: "none" }}
              multiple
              type="file"
              onChange={handleImageUploadClick}
            /> )
          }


            <div className="imgpos">
              <label htmlFor="contained-button-file">
                <Avatar
                  alt="Remy Sharp"
                  className="profile__header__image"
                  src={info.imageUrl}
                />
            {!readOnlyFlow && ( <AddAPhotoIcon className="profileImage__addIcon " /> ) }
              </label>
            </div>

            <div className="profile__user">
              <label className="user_label">{`${info.firstName}  ${info.lastName}`}</label>
              {info.headLine === undefined ? (
                <label className="user_role">No Headline added</label>
              ) : (
                <label className="user_role">{info.headLine}</label>
              )}
              
              <Chip className="user_status"
        label={updatedProfileStatus}
        
      />
              
               
              {/* {info.location === undefined ? (
                <label className="user__role">No Location added</label>
              ) : (
                <label className="user__role">{info.location}</label>
              )} */}
            </div>
          </div>
          {!readOnlyFlow && (
            <div className="profile__header__main__container">
              <div
                className="profile__user__edit"
                onClick={() => handleModelChange(true)}
              >
                {" "}
                <EditIcon color="#6200EE" />
                <p>EDIT</p>
              </div>
            </div>
          )}
        </div>
        <div className="profile__user_bar">
          <div className="profile__user_bar_left">
            <p>Email : </p>{" "}
            <p className="profile__user_bar_left__value_mail">{info.email}</p>
          </div>
          {(updatedSocialLinks['LINKEDIN'] || updatedSocialLinks['TWITTER'] || updatedSocialLinks['FACEBOOK']) && (
          <div className="profile__user_bar_right">
            <p className="profile__user_bar_left">Social :</p>{" "}
            {updatedSocialLinks['LINKEDIN'] && (
            <p
              className="profile__user_bar_left__value"
              onClick={() => handleSocialModelClick("LINKEDIN")}
            >
              LINKEDIN 
            </p>
            )}{" "}
            {updatedSocialLinks['TWITTER'] && (<p
              className="profile__user_bar_left__value"
              onClick={() => handleSocialModelClick("TWITTER")}
            >
              TWITTER
            </p>
            )}
            {updatedSocialLinks['FACEBOOK'] && (<p
              className="profile__user_bar_left__value"
              onClick={() => handleSocialModelClick("FACEBOOK")}
            >
              FACEBOOK
            </p>
            )}
          </div>
          )}
        </div>
      </div>
      <Dialog
        open={openModel}
        onClose={() => setOpenModel(false)}
        fullWidth
        maxWidth="md"
      >
        <form>
        <DialogTitle>Edit Basic Details</DialogTitle>
        <DialogContent>
        
            <div className="signUp__form_names">
              <div className="signUp__form__page">
                <TextField
                  className="text_field_outline"
                  name="updatedFirstName"
                  id="outlined-required"
                  tpye="text"
                  label="First Name"
                  rows="3"
                  variant="outlined"
                  value={updatedFirstName}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              <div className="signUp__form__page">
                <TextField
                  className="text_field_outline"
                  name="updatedLastName"
                  id="outlined-required"
                  tpye="text"
                  label="Last Name"
                  variant="outlined"
                  value={updatedLastName}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </div>
            <div className="signUp__form_names">
              <div className="signUp__form__page_location">
                <TextField
                  name="updatedHeadLine"
                  id="outlined-required"
                  tpye="text"
                  label="Role"
                  variant="outlined"
                  value={updatedHeadLine}
                  onChange={handleChange}
                  fullWidth
                />
              </div>                            
            </div>
            <div className="signUp__form_names">
              <div className="signUp__form__page">
                <TextField
                  className="text_field_outline"
                  id="outlined-required"
                  fullWidth
                  select
                  name="updatedProfileStatus"
                  value={updatedProfileStatus}
                  onChange={handleChange}
                  label="Status"
                  variant="outlined"
                  InputLabelProps={{ shrink: statuss ? true : false }}
                >
                  {statuss.map((info) => (
                <MenuItem value={info.value}>{info.name}</MenuItem>
              ))}
                  </TextField>
              </div>
              <div className="signUp__form__page modal">
                <label htmlFor="Profile Visibleto Alumnae Community">
                  Profile Visible to Alumnae Community
                  <Switch
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={handleProfileVisibility}
                  />
                </label>
              </div>
            </div>
            <div className="signUp__form_names">
              <div className="signUp__form__page_location">
                <TextField
                  name="updatedEmail"
                  id="outlined-required"
                  tpye="text"
                  label="Email Address"
                  placeholder="Where you live"
                  variant="outlined"
                  value={updatedEmail}
                  onChange={handleChange}
                  disabled={true}
                  fullWidth
                />
              </div>                            
            </div>
            <div className="ems">This is used as your login username and cannot be modified.</div>
            </DialogContent>
        
            <DialogTitle>Social Profile URLs</DialogTitle>
            
            <DialogContent>
            <div className="social__form_names">
              <div className="social__form__page">
                <div className="modal">
                  <TextField
                    name="LINKEDIN"
                    id="outlined-required"
                    tpye="text"
                    label="LINKEDIN"
                    placeholder="Linkto"
                    variant="outlined"
                    value={updatedSocialLinks.LINKEDIN}
                    onChange={handleSocialModelChange}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <AddLinkIcon edge="end"></AddLinkIcon>
                      </InputAdornment>
                    }
                  />
                </div>
              </div>
              <div className="social__form__page">
                <TextField
                  name="FACEBOOK"
                  id="outlined-required"
                  tpye="text"
                  label="FACEBOOK"
                  placeholder="Linkto"
                  variant="outlined"
                  value={updatedSocialLinks.FACEBOOK}
                  onChange={handleSocialModelChange}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <AddLinkIcon edge="end"></AddLinkIcon>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="social__form__page">
                <TextField
                  name="TWITTER"
                  id="outlined-required"
                  tpye="text"
                  label="TWITTER"
                  placeholder="Linkto"
                  variant="outlined"
                  value={updatedSocialLinks.TWITTER}
                  onChange={handleSocialModelChange}
                  fullWidth
                />
              </div>
            </div>
           
            </DialogContent>
            
            </form>
        
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
  );
};

ProfileHeader.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { editUserDetails, uploadProfileImage };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
