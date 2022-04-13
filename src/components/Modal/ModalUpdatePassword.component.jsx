import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./modal.css";
import TextField from "@material-ui/core/TextField";
import { updateLoanBrief } from "../../api/AdminAPI";

export default function ModalUpdatePassword(props) {
  const [pass, setPass] = useState("");
  const handleClose = () => {
    props?.handleClose();
  };

  const handleChange = (event) => {
    setPass(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="wrap-modal"
      >
        <DialogTitle id="alert-dialog-title">Cập nhật mật khẩu mới</DialogTitle>
        <DialogContent>
          <div className="content-modal-password">
            <span>Tên đăng nhập:</span> <span> {props?.username} </span>
          </div>
          <div className="mt-2 content-modal-password">
            <span>Mật khẩu mới: </span>
            <span> {props?.password} </span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.handleClose} className="btn-close">
            Hủy
          </Button>
          <Button
            autoFocus
            className="btn-add"
            onClick={() => props?.handleUpdatePass(pass)}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
