import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import { getAllNews, covertDate } from "../../../../api/AdminAPI";

export default function ModalNewsComponent(props) {
  const [data, setData] = useState([]);
  useEffect(async () => {
    await getAllNews().then((res) => {
      setData(res.data);
    });
  }, []);
  const listsNews = data.map((e, index) => {
    return (
      <Grid
        container
        spacing={2}
        className="news-modal"
        onClick={() => props?.handleSelectNews(e)}
      >
        <Grid item lg={3}>
          <div>
            <img src={e?.thumbnail?.url} alt="" width="100%" />
          </div>
        </Grid>
        <Grid item lg={9}>
          <div className="title-news">
            <span>{e?.title}</span>
          </div>
          <div className="date-news mt-2">
            <span>{covertDate(e?.created)}</span>
          </div>
        </Grid>
      </Grid>
    );
  });
  return (
    <div>
      <Dialog
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Danh sách bài viết ưu đãi
        </DialogTitle>
        <DialogContent>{listsNews}</DialogContent>
        <DialogActions>
          <Button onClick={props?.handleClose} color="primary" autoFocus>
            Quay lại
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
