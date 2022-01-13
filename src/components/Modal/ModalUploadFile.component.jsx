import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonUploadComponent from "../ButtonUpload/ButtonUpload.component";
import "./modal.css";
import { importFileLoan, importFileSending } from "../../api/AdminAPI";

export default function ModalUploadFileComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [file, setfile] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeFile = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        setfile(file);
      });
    }
  };

  const handleClose = () => {
    setfile();
    props.handleClose();
  };

  const handleAdd = async () => {
    if (!file) {
      alert("Xin vui lòng chọn file cần nhập");
    } else {
      props.handleLoading(true);
      if (props?.status === "loan") {
        await importFileLoan(file).then(() => {
          props.handleLoading(false);
          setfile();
          props.handleClose();
          props.handleReload();
        });
      } else if (props?.status === "sending") {
        await importFileSending(file).then(() => {
          props.handleLoading(false);
          setfile();
          props.handleClose();
          props.handleReload();
        });
      }
    }
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
          Nhập dữ liệu từ file excel (.xlsx)
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="mb-3">
              {file ? (
                <span style={{ color: "#4699d4" }}>{file?.name}</span>
              ) : (
                <span>Chưa có file nào được chọn</span>
              )}
            </div>
            <ButtonUploadComponent handleChangeFile={handleChangeFile} />
          </DialogContentText>
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
