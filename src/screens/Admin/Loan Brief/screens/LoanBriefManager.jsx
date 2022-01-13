import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TableComponent from "../../../../components/Table/Table.component";
import ModalUploadFileComponent from "../../../../components/Modal/ModalUploadFile.component";
import {
  getLoanBrief,
  covertDate,
  DeleteLoanBrief,
} from "../../../../api/AdminAPI";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ModalDeleteComponent from "../../../../components/Modal/ModelDelete.component";
import AddIcon from "@material-ui/icons/Add";
import ModalAddLoanBriefComponent from "../../../../components/Modal/ModalAddLoanBrief.component";
import ModalUpdateLoanBriefComponent from "../../../../components/Modal/ModalUpdateLoanBrief.component";
export default function LoanBriefManager(props) {
  const [loanBrief, setLoanBrief] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [selectID, setSelectID] = useState();
  const [content, setContent] = useState();

  useEffect(async () => {
    props.handleLoading(true);
    await getLoanBrief().then((res) => {
      console.log(res);
      setLoanBrief(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const columns = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "content", headerName: "NỘI DUNG", width: 400 },
    { field: "created", headerName: "NGÀY TẠO", width: 180 },
    {
      field: "action",
      headerName: "CHỨC NĂNG",
      width: 180,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action);
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

  const rows = loanBrief.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      content: e?.content,
      created: covertDate(e?.createAt),
      action: e,
    };
  });

  const handleClickDelete = (id) => {
    setSelectID(id);
    setOpenModalDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectID();
    setOpenModalDelete(false);
  };

  const handleSubmitDelete = async () => {
    if (selectID) {
      const data = {
        id: selectID,
      };
      await DeleteLoanBrief(data).then((res) => {
        setSelectID();
        setOpenModalDelete(false);
        setReload(!reload);
      });
    }
  };

  const handleReload = () => {
    setReload(!reload);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleClickAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenModalAdd(false);
  };

  const handleCloseEdit = () => {
    setContent();
    setOpenModalEdit(false);
  };

  const handleClickEdit = (action) => {
    setContent(action);
    setOpenModalEdit(true);
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">HỒ SƠ VAY VỐN:</span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClickAdd}
        >
          Thêm nội dung
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
        open={openModalDelete}
        title="Xác nhận xóa nội dung"
        handleClose={handleCloseDelete}
        handleDelete={handleSubmitDelete}
      />
      <ModalAddLoanBriefComponent
        open={openModalAdd}
        handleClose={handleCloseAdd}
        handleReload={handleReload}
      />
      <ModalUpdateLoanBriefComponent
        open={openModalEdit}
        handleClose={handleCloseEdit}
        handleReload={handleReload}
        content={content}
      />
    </Grid>
  );
}
