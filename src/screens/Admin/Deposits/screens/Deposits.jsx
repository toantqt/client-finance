import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import ModalUploadFileComponent from "../../../../components/Modal/ModalUploadFile.component";
import { getBorrowProduct, covertDate } from "../../../../api/AdminAPI";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
export default function Deposits(props) {
  const history = useHistory();
  const [user, setUser] = useState([
    { name: "Có kỳ hạn", type: 1 },
    { name: "Không kỳ hạn", type: 2 },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    props.handleLoading(false);
  }, [reload]);

  const columns = [
    { field: "title", headerName: "Tiêu đề", width: 300 },
    {
      field: "action",
      headerName: "CHỨC NĂNG",
      width: 200,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action?.type);
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = user.map((e, index) => {
    return {
      id: index,
      title: e?.name,
      created: covertDate(e?.createAt),
      action: e,
    };
  });

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleReload = () => {
    setReload(!reload);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleClickEdit = (id) => {
    history.push(`/admin/edit-deposits/${id}`);
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ TIỀN GỬI:</span>
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
      <ModalUploadFileComponent
        open={openModal}
        handleClose={handleClose}
        handleLoading={props.handleLoading}
        handleReload={handleReload}
        status="sending"
      />
    </Grid>
  );
}
