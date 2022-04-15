import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./modal.css";
import TextField from "@material-ui/core/TextField";

export default function ModalNews(props) {
  console.log(props);
  const listsContent = props?.data?.listContent?.map((e) => {
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: e.content }}
          style={{ fontSize: "18px" }}
        ></div>
        <div>
          {e.library.map((el, index) => {
            if (el.type === "image") {
              return (
                <div
                  className="mt-5 mb-2"
                  style={{ width: "80%", margin: "0 auto" }}
                >
                  <img src={el.url} width="100%" height="100%" loading="lazy" />
                </div>
              );
            } else {
              return <div></div>;
            }
          })}
        </div>
      </div>
    );
  });

  return (
    <div>
      <Dialog
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="modal-news"
      >
        <DialogContent>
          <div>
            <h3>{props?.data?.title}</h3>
          </div>
          <div>{listsContent}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.handleClose} className="btn-close">
            Quay lại
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
