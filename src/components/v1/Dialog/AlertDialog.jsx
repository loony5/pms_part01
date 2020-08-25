import React from "react";
import cn from "classnames";
import defaultStyle from "./Dialog.module.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "components/v1/Button";
import Typography from "components/v1/Typography";
import PropTypes from "prop-types";

function AlertDialog({
  onClose,
  open,
  title,
  content,
  handleChangeSuccess,
}) {
  let h;
  let w;

  return (
    <Dialog
      disableBackdropClick={true}
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "#0d0f14",
          borderRadius: 20,
          boxShadow: "0 0 20px 0 rgba(0, 226, 255, 0.17)",

          padding: 20,
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: "transparent",
        },
      }}
    >
      {title && (
        <DialogTitle
          style={{ textAlign: "center", padding: 0, marginBottom: 10 }}
        >
          <Typography color="white" variant="h2">
            {title}
          </Typography>
        </DialogTitle>
      )}
      <DialogContent
        style={{
          padding: 0,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          height: 101,
          width: 350,
        }}
      >
        <Typography color="white" variant="h2" style={{ fontWeight: "normal" }}>{content}</Typography>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          <div style={{ display: "flex" }}>
            <Button
              onClick={handleChangeSuccess}
              style={{ height: 50, width: 170 }}
            >
              확인
              </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.element,
  handleChangeSuccess: PropTypes.func,
};

AlertDialog.defaultProps = {};

export default AlertDialog;
