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

export default function ModalUpdateLoanBriefComponent(props) {
  const [content, setContent] = useState();
  const [id, setID] = useState();

  useEffect(() => {
    if (props.content) {
      setContent(props?.content.content);
      setID(props?.content?._id);
    }
  }, [props]);

  const handleUpdate = async () => {
    if (!content || content === "") {
      alert("Xin vui lòng thêm nội dung!");
    } else {
      let data = {
        content: content,
        id: id,
      };
      await updateLoanBrief(data).then(() => {
        setContent();
        setID();
        props.handleReload();
        props?.handleClose();
      });
    }
  };

  const handleClose = () => {
    setContent();
    props?.handleClose();
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Cập nhật nội dung hồ sơ vay vốn
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props?.content?.content ? (
              <TextField
                id="outlined-basic"
                label="Nội dung"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={handleChange}
                key={props?.content?.content}
                defaultValue={props?.content?.content}
              />
            ) : (
              <></>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="btn-close">
            Hủy
          </Button>
          <Button onClick={handleUpdate} autoFocus className="btn-add">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
