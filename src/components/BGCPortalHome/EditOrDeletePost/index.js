import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { Add, Clear } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import TextField from "@material-ui/core/TextField";
import {
  editAPost,
  editAPostwithDocument,
  deleteAPost,
  clearErrors,
} from "../../../redux/actions/postActions";
import { ButtonGroup, Modal, Button } from "@mui/material";
import { linkRegex } from "../../../util/constant";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./EditOrDelete.css";

const EditOrDeletePost = ({
  editUserCommunityPost,
  editUserCommunityPostwithDocument,
  deleteUserCommunityPost,
  article,
}) => {
  const [editorText, setEditorText] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [sharedDocument, setSharedDocument] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [docChange, setDocChange] = useState(false);
  const documentReset = Boolean(docChange);

  const handleDocumentChange = (e) => {
    const doc = e.target.files[0];

    if (!doc) {
      alert(`Not a valid image/document`);
      return;
    }

    const imageTypes = ["image/gif", "image/jgp", "image/png", "image/jpeg"];
    if (imageTypes.includes(doc.type)) {
      setDocumentType("image");
    } else setDocumentType("document");

    setSharedDocument(doc);
    setDocChange(true);
  };

  const postArticle = (e) => {
    e.preventDefault();

    if (sharedDocument) {
      const payload = {
        postPayload: {
          postId: article.postId,
          sharedVideo: videoLink,
          body: editorText,
          docType: documentType,
          communityId: article.communityId,
          documentReset: documentReset,
        },
        sharedDocument,
      };
      editUserCommunityPostwithDocument(payload);
      reset(e);
    } else {
      const payload = {
        postPayload: {
          postId: article.postId,
          sharedImg: "",
          sharedVideo: videoLink,
          docType: "",
          body: editorText,
          communityId: article.communityId,
          documentReset: documentReset,
        },
      };
      editUserCommunityPost(payload);
      reset(e);
    }
  };

  const removeDocument = (e) => {
    setSharedDocument("");
    setDocChange(true);
  };

  const reset = (e) => {
    setEditorText("");
    setVideoLink("");
    setSharedDocument("");
    setOpenModel(false);
    setDocChange(false);
    //setAnchorEl(null);
  };

  const resetDeleteDialog = (e) => {
    setOpenDeleteModel(false);
    //setAnchorEl(null);
  };

  const history = useHistory();

  const handleEditChange = (value) => {
    setOpenModel(value);
    if (article) {
      if (article.body) {
        setEditorText(article.body);
      }
      if (article.docType) {
        setDocumentType(article.docType);
      }
      if (article.sharedVideo) {
        setVideoLink(article.sharedVideo);
      }

      if (article.sharedDocumentURL) {
        setSharedDocument(article.sharedDocumentURL);
      }
    }
  };

  const handleDelete = (value) => {
    setCurrentStep(0);
    setOpenDeleteModel(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteArticle = (currentStep) => {
    const payload = {
      postPayload: {
        postId: article.postId,
      },
    };

    if (currentStep === 1) {
      deleteUserCommunityPost(payload);
    }

    setCurrentStep(currentStep);

    if (currentStep > 1) {
      setOpenDeleteModel(false);
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
        <MenuItem onClick={() => handleEditChange(true)}>Edit Post</MenuItem>
        <MenuItem onClick={() => handleDelete(true)}>Delete Post</MenuItem>
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
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            className="editpost__page"
            value={editorText}
            onChange={(e) => {
              const link = e.target.value.match(linkRegex);
              setEditorText(e.target.value);
              setVideoLink(() => (link && link[0] ? link[0] : null));
            }}
            label="What do you want to share?"
            multiline
            variant="outlined"
            fullWidth
            rows={4}
          />
          {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}

          <div style={{ padding: "0 16px" }}>
            {sharedDocument ? (
              <>
                <a
                  target="_blank"
                  download={
                    documentReset
                      ? sharedDocument.name
                      : article.sharedDocumentName
                  }
                  href={
                    documentReset
                      ? URL.createObjectURL(sharedDocument)
                      : sharedDocument
                  }
                >
                  {documentReset
                    ? sharedDocument.name
                    : article.sharedDocumentName}
                </a>
                <Button
                  onClick={(event) => removeDocument(event)}
                  // onClick={() => setSharedDocument("")}
                  variant="text"
                  component="span"
                  color="primary"
                >
                  <Clear />
                  <strong>REMOVE FILE</strong>
                </Button>
              </>
            ) : (
              <>
                <input
                  disabled={sharedDocument}
                  id="file-input"
                  type="file"
                  accept="image/gif, image/jgp, image/png, image/jpeg, .pdf, .docx"
                  hidden
                  onChange={handleDocumentChange}
                />
                <label htmlFor="file-input">
                  <Button variant="text" component="span" color="primary">
                    <Add />
                    <strong>ATTACH IMAGE OR FILE</strong>
                  </Button>
                </label>
              </>
            )}
          </div>
        </DialogContent>

        <ButtonGroup
          style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
        >
          <div className="__report__post__footer">
            <div className="signUp__footer__PrevBtn">
              <Button
                onClick={(event) => reset(event)}
                color="primary"
                style={{ margin: "0 10px" }}
                variant="outlined"
              >
                CANCEL
              </Button>
            </div>

            <div className="signUp__footer__nextBtn">
              <Button
                color="primary"
                variant="contained"
                onClick={(event) => postArticle(event)}
                disabled={!editorText}
              >
                SAVE
              </Button>
            </div>
          </div>
        </ButtonGroup>
      </Dialog>

      <Dialog
        open={openDeleteModel}
        onClose={() => setOpenDeleteModel(false)}
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
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          {currentStep === 0 && (
            <div className="__display-linebreak__">
              {
                "Are you sure you want to delete this post? \n This action cannot be undone."
              }
            </div>
          )}
          {currentStep === 1 && (
            <div className="__reportstep2__section__">
              <CheckCircleIcon
                color="primary"
                className="step7_section__checkBar"
              />
              <p>Your post has been successfully deleted.</p>
            </div>
          )}
        </DialogContent>

        <ButtonGroup
          style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}
        >
          <div className="__report__post__footer">
            <div className="signUp__footer__PrevBtn">
              <Button
                onClick={(event) => resetDeleteDialog(event)}
                color="primary"
                style={{ margin: "0 10px" }}
                variant="outlined"
              >
                CANCEL
              </Button>
            </div>

            <div className="signUp__footer__nextBtn">
              <Button
                color="primary"
                variant="contained"
                onClick={() => deleteArticle(currentStep + 1)}
              >
                {currentStep === 0 ? " DELETE POST" : "CLOSE"}
              </Button>
            </div>
          </div>
        </ButtonGroup>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.UI.loading,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editUserCommunityPost: (payload) => dispatch(editAPost(payload)),
  editUserCommunityPostwithDocument: (payload) =>
    dispatch(editAPostwithDocument(payload)),
  deleteUserCommunityPost: (payload) => dispatch(deleteAPost(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrDeletePost);
