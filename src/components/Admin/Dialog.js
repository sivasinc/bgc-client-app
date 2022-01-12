import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function AlertDialogWithActions({
  open,
  handleClose,
  onAccept,
  onReject,
  acceptButtonText,
  rejectButtonText,
  dialogBody,
  dialogTitle,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
            {dialogBody}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onReject}>{rejectButtonText}</Button>
          <Button variant="contained" onClick={onAccept} autoFocus>
            {acceptButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function AlertInfoDialog({
  open,
  handleClose,
  dialogBody,
  dialogTitle,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent sx={{width: 400, textAlign: 'center'}}>
          <CheckCircleIcon color="primary"/>
            {dialogBody}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
