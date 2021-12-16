import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@mui/material/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { editUserDetails } from "../../redux/actions/userActions";
import { uploadProfileImage } from "../../redux/actions/postActions";

import "./BGCProfileHome.css";
import { InputAdornment } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const ProfileHeader = ({
  user: { userInfo, selectedMember },
  readOnlyFlow,
  editUserDetails,
  uploadProfileImage,
}) => {
  const [openModel, setOpenModel] = useState(false);
  const [openSocialModel, setOpenSocialModel] = useState(false);
  const { socialLinks } = userInfo;
  console.log("userinfo", userInfo);
  const [profile, setProfile] = useState({ updatedSocialLinks: socialLinks });
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
    };
    const request = { ...userInfo, ...userDetails };
    console.log("profile header req", request);
    editUserDetails(request);
    setOpenModel(false);
  };
  const handleProfileVisibility = (event) => {
    console.log("the event is", event);
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
    updatedSocialLinks = { LinkedIn: "", Facebook: "", Twitter: "" },
  } = profile;
  console.log("sllinks", updatedSocialLinks);
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
              <label className="user__label">{`${info.firstName}  ${info.lastName}`}</label>
              {info.headLine === undefined ? (
                <label className="user__role">No Headline added</label>
              ) : (
                <label className="user__role">{info.headLine}</label>
              )}
              {info.location === undefined ? (
                <label className="user__role">No Location added</label>
              ) : (
                <label className="user__role">{info.location}</label>
              )}
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
                <p>EDIT PROFILE</p>
              </div>
            </div>
          )}
        </div>
        <div className="profile__user_bar">
          <div className="profile__user_bar_left">
            <p>Email : </p>{" "}
            <p className="profile__user_bar_left__value">{info.email}</p>
          </div>
          <div className="profile__user_bar_right">
            <p className="profile__user_bar_left">Social :</p>{" "}
            <p
              className="profile__user_bar_left__value"
              onClick={() => handleSocialModelClick("LinkedIn")}
            >
              Linked In
            </p>{" "}
            <p
              className="profile__user_bar_left__value"
              onClick={() => handleSocialModelClick("Twitter")}
            >
              Twitter
            </p>
            <p
              className="profile__user_bar_left__value"
              onClick={() => handleSocialModelClick("Facebook")}
            >
              Facebook
            </p>
          </div>
        </div>
      </div>
      <Dialog
        open={openModel}
        onClose={() => setOpenModel(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Basic details</DialogTitle>
        <DialogContent>
          <form>
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
              <div className="signUp__form__page">
                <TextField
                  className="text_field_outline"
                  name="updatedEmail"
                  id="outlined-required"
                  tpye="text"
                  label="Email"
                  variant="outlined"
                  value={updatedEmail}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
              <div className="signUp__form__page modal">
                <label htmlFor="Profile Visibleto Alumnae Community">
                  Profile Visibleto Alumnae Community
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
                  name="updatedLocation"
                  id="outlined-required"
                  tpye="text"
                  label="Location"
                  placeholder="Where you live"
                  variant="outlined"
                  value={updatedLocation}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </div>
            <DialogTitle>Social Profile URLs</DialogTitle>
            <div className="social__form_names">
              <div className="social__form__page">
                <div className="modal">
                  <TextField
                    name="LinkedIn"
                    id="outlined-required"
                    tpye="text"
                    label="LinkedIn"
                    placeholder="Linkto"
                    variant="outlined"
                    value={updatedSocialLinks.LinkedIn}
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
                  name="Facebook"
                  id="outlined-required"
                  tpye="text"
                  label="Facebook"
                  placeholder="Linkto"
                  variant="outlined"
                  value={updatedSocialLinks.Facebook}
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
                  name="Twitter"
                  id="outlined-required"
                  tpye="text"
                  label="Twitter"
                  placeholder="Linkto"
                  variant="outlined"
                  value={updatedSocialLinks.Twitter}
                  onChange={handleSocialModelChange}
                  fullWidth
                />
              </div>
            </div>
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
  );
};

ProfileHeader.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { editUserDetails, uploadProfileImage };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);