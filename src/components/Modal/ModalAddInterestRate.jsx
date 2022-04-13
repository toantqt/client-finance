import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./modal.css";
import TextField from "@material-ui/core/TextField";
import { addLoanBrief } from "../../api/AdminAPI";

export default function ModalAddInterestRate(props) {
  const [time, setTime] = useState("");
  const [interestRate, setInterestRate] = useState("");

  useEffect(() => {
    setTime("");
    setInterestRate("");
  }, [props?.open]);

  const handleAdd = () => {
    props.handleAdd(time, interestRate);
  };

  const handleClose = () => {
    props?.handleClose();
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "time") {
      setTime(value);
    } else if (name === "interestRate") {
      setInterestRate(value);
    }
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
        <DialogTitle id="alert-dialog-title">Thêm lãi suất mới</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              id="outlined-basic"
              label="Thời gian (tháng)"
              variant="outlined"
              style={{ width: "100%" }}
              name="time"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <TextField
              id="outlined-basic"
              label="Lãi suất (%)"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={handleChange}
              name="interestRate"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="btn-close">
            Hủy
          </Button>
          <Button onClick={handleAdd} autoFocus className="btn-add">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
