import React, { useState, createRef, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function FocusButton(props) {
  const { handleClose, dialogRendered } = props;

  const actionRef = createRef();

  useLayoutEffect(() => {
    if (dialogRendered && actionRef.current) {
      actionRef.current.focusVisible();
    }
  }, [dialogRendered]);

  return (
    <Button action={actionRef} onClick={handleClose}>
      Ok
    </Button>
  );
}

export default function Layout() {
  const classes = useStyles();

  const defaultRef = createRef();
  const [openModal, setOpenModal] = useState(false);
  const [dialogRendered, setDialogRendered] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const openModalDialog = () => {
    setOpenModal(true);
  };

  const handlePrimaryClick = () => {
    defaultRef.current.focusVisible();
  };

  const dialogEntered = () => {
    setDialogRendered(true);
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={openModal}
        fullScreen={false}
        onEntered={dialogEntered}
        BackdropProps={{ style: { position: "absolute" } }}
        disableBackdropClick={true}
        disableScrollLock={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-description"
        disableEnforceFocus={true}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Heading
          </DialogContentText>
          <DialogActions>
            <FocusButton
              dialogRendered={dialogRendered}
              handleClose={handleClose}
            />
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Typography variant="body2">
        Clicking default button, opens a dialog with action button autofocus
        with ripple effect
      </Typography>

      <Button action={defaultRef} variant="outlined" onClick={openModalDialog}>
        Default
      </Button>

      <Typography variant="body2">
        Clicking the primary button focuses the default button with ripple
        effect
      </Typography>

      <Button variant="outlined" color="primary" onClick={handlePrimaryClick}>
        Primary
      </Button>

      <div>
        <Typography variant="body" component="i">
          Used the button base action prop to focus the buttons using
          focusVisible();
        </Typography>
      </div>
    </div>
  );
}
