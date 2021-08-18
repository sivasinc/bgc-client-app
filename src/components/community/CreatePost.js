import React from "react";
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const CreatePost = ({
    errors, classes, handleChange,
    handleSubmit, loading
}) => {
  return (
    <React.Fragment>
      <DialogTitle>Add a new Post!</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="POST!!"
            multiline
            rows="3"
            placeholder="Enter your post here..."
            error={errors.body ? true : false}
            helperText={errors.body}
            className={classes.textField}
            onChange={handleChange}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={loading}
          >
            Submit
            {loading && (
              <CircularProgress size={30} className={classes.progressSpinner} />
            )}
          </Button>
        </form>
      </DialogContent>
    </React.Fragment>
  );
};

export default CreatePost;
