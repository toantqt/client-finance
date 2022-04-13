import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import {
  countNotification,
  getNotification,
  covertDate,
} from "../../../../api/AdminAPI";
import TableComponent from "../../../../components/Table/Table.component";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddAlertIcon from "@material-ui/icons/AddAlert";

export default function Notifcation(props) {
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(async () => {
    props.handleLoading(true);
    await countNotification().then((res) => {
      setCount(res.data);
    });
    await getNotification(page).then((res) => {
      setData(res.data);
    });
    props.handleLoading(false);
  }, []);

  const handleChangePage = (page) => {
    setPage(page);
  };

  const columns = [
    { field: "receiverID", headerName: "NGƯỜI NHẬN", width: 200 },
    { field: "type", headerName: "LOẠI THÔNG BÁO", width: 200 },
    { field: "title", headerName: "TIÊU ĐỀ", width: 200 },
    { field: "newsID", headerName: "BÀI VIẾT", width: 200 },
    { field: "content", headerName: "NỘI DUNG", width: 200 },
    { field: "created", headerName: "NGÀY TẠO", width: 200 },
  ];

  const rows = data.map((e, index) => {
    return {
      id: index,
      receiverID: e.receiverID,
      type: e.type,
      title: e.title,
      newsID: e.newsID,
      content: e.content,
      created: covertDate(e.created),
    };
  });

  const handleClickNotiAll = () => {
    history.push({
      pathname: AdminSlug.createNotificationAll,
      search: `?id=all`,
    });
  };
  const handleClickNotiUser = () => {
    history.push(AdminSlug.userManager);
  };
  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ THÔNG BÁO: </span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PersonAddIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClickNotiUser}
        >
          Thông báo cá nhân
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddAlertIcon />}
          style={{
            textTransform: "none",
            float: "right",
            marginRight: "10px",
            backgroundColor: "orange",
            color: "white",
          }}
          onClick={handleClickNotiAll}
        >
          Thông báo tất cả
        </Button>
      </div>

      <div className="mt-3">
        <TableComponent
          columns={columns}
          rows={rows}
          count={count}
          page={page}
          handleChangePage={handleChangePage}
        />
      </div>
    </Grid>
  );
}
