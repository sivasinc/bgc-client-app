import React from "react";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from '@material-ui/core/DialogActions';
import MyButton from '../../util/MyButton';



const CreateCommunity = ({
    classes, handleCommunityImageChange,
    currentCommunityImageUrl,
    handleEditCommunityPicture,
    name,
    handleChange,
    description,
    handleClose,
    handleAddCommunitySubmit
}) => {
  return (
    <React.Fragment>
      <DialogTitle>Create a community!</DialogTitle>
      <DialogContent>
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                src={currentCommunityImageUrl}
                alt="community"
                className="profile-image"
              />
              <input
                type="file"
                id="communityImageInput"
                hidden="hidden"
                onChange={handleCommunityImageChange}
              />
              <MyButton
                tip="Add community picture"
                onClick={handleEditCommunityPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <hr />
            <form>
              <TextField
                name="name"
                tpye="text"
                label="Community Name"
                multiline
                rows="3"
                placeholder="Name of your community"
                className={classes.textField}
                value={name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="description"
                tpye="text"
                label="Community Description"
                placeholder="Description about community"
                className={classes.textField}
                value={description}
                onChange={handleChange}
                fullWidth
              />
            </form>
          </div>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddCommunitySubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default CreateCommunity;
