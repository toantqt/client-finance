import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  getListsNews,
  covertDate,
  getDetailsVoucher,
} from "../../../../api/AdminAPI";
import TableComponent from "../../../../components/Table/Table.component";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import queryString from "query-string";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import ModalDeleteComponent from "../../../../components/Modal/ModelDelete.component";

export default function NewsManager(props) {
  const history = useHistory();
  const query = queryString.parse(props.location.search);
  const id = query.id;
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [voucher, setVoucher] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteID, setDeleteID] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    if (id) {
      getDetailsVoucher(id).then((res) => {
        setVoucher(res.data);
      });
      await getListsNews(id).then((res) => {
        setData(res.data);
      });
      props.handleLoading(false);
    }
  }, [id]);

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "name", headerName: "Bài viết", width: 400 },
    { field: "created", headerName: "Ngày tạo", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 250,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-1"
              onClick={() => {
                // handleClickView(action.row?.action?.slug);
              }}
            >
              <VisibilityIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                // handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-3"
              onClick={() => {
                handleClickDelete(action.row?.action?._id);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleChangePage = (page) => {
    setPage(page);
  };

  const rows = data.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      name: e?.title,
      created: covertDate(e?.createAt),
      action: e,
    };
  });

  const handleClick = () => {
    history.push({
      pathname: AdminSlug.addNews,
      search: `?id=${id}`,
    });
  };

  const handleClickDelete = (id) => {
    setDeleteID(id);
    setShowModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setDeleteID();
    setShowModalDelete(false);
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">
          QUẢN LÝ BÀI VIẾT -{" "}
          <span style={{ color: "orange" }}>{voucher?.titleVoucher}</span>
        </span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClick}
        >
          Tạo bài viết
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
      <ModalDeleteComponent
        open={showModalDelete}
        title="Xác nhận xóa bài viết"
        handleClose={handleCloseModalDelete}
      />
    </Grid>
  );
}
