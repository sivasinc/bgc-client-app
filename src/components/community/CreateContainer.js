import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import {
  postScream,
  clearErrors,
  getPostCreateCommunity,
} from "../../redux/actions/dataActions";
import {
  logoutUser,
  uploadCommunityImage,
} from "../../redux/actions/userActions";
import CreateCommunity from "./CreateCommunity";
import CreatePost from "./CreatePost";

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
    name: "",
    description: "",
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    console.log("currentProps", this.props);
    if (
      prevProps.user.currentCommunityImageUrl !==
      this.props.user.currentCommunityImageUrl
    ) {
      console.log("community image url is not same");
      this.setState({ open: true });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    console.log("handleClose-PostScream");
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      communityPosts,
      communityPosts: { community },
    } = this.props.data;
    this.props.postScream({
      body: this.state.body,
      communityId: community.communityId,
    });
  };

  handleAddCommunitySubmit = (event) => {
    event.preventDefault();
    const {
      user: { currentCommunityImageUrl },
    } = this.props;
    this.props.getPostCreateCommunity({
      name: this.state.name,
      description: this.state.description,
      imageUrl: currentCommunityImageUrl,
    });
    this.setState({ open: false });
  };
  handleCommunityImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadCommunityImage(formData);
  };
  handleEditCommunityPicture = () => {
    const fileInput = document.getElementById("communityImageInput");
    fileInput.click();
  };
  render() {
    console.log("navbar");
    const { errors } = this.state;
    const {
      classes,
      data: { currentPage },
      UI: { loading },
      user: {
        credentials: { handle, createdAt, bio, website, location },
        currentCommunityImageUrl,
      },
    } = this.props;
    let tipMessage = "Add a new community!";
    if (currentPage === "POST") {
      tipMessage = "Add a new Post!";
    }
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip={tipMessage}>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          {currentPage === "COMMUNITY" ? (
            <CreateCommunity
              classes={classes}
              handleCommunityImageChange={this.handleCommunityImageChange}
              currentCommunityImageUrl={currentCommunityImageUrl}
              handleChange={this.handleChange}
              name={this.state.name}
              description={this.state.description}
              handleClose={this.handleClose}
              handleAddCommunitySubmit={this.handleAddCommunitySubmit}
              handleEditCommunityPicture={this.handleEditCommunityPicture}
            />
          ) : (
            <CreatePost
              errors={this.state.errors}
              classes={classes}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              loading={loading}
            />
          )}
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, {
  postScream,
  clearErrors,
  uploadCommunityImage,
  getPostCreateCommunity,
})(withStyles(styles)(PostScream));
