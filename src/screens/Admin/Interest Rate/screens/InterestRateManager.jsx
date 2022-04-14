import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import ModalUploadFileComponent from "../../../../components/Modal/ModalUploadFile.component";
import {
  getInterestRate,
  covertDate,
  addInterestRate,
  deleteInterestRate,
  updateInterestRate,
} from "../../../../api/AdminAPI";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import ModalAddInterestRate from "../../../../components/Modal/ModalAddInterestRate";
import ModalDeleteComponent from "../../../../components/Modal/ModelDelete.component";
import ModalUpdateInterestRate from "../../../../components/Modal/ModalUpdateInterestRate";

export default function InterestRateManager(props) {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    await getInterestRate(page).then((res) => {
      setUser(res.data);
    });
    props.handleLoading(false);
  }, [reload]);
  const columns = [
    { field: "time", headerName: "THỜI GIAN (THÁNG)", width: 300 },
    { field: "interestRate", headerName: "LÃI SUẤT (%)", width: 300 },
    { field: "created", headerName: "NGÀY TẠO", width: 200 },
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

  const rows = user.map((e, index) => {
    return {
      id: index,
      time: e?.time,
      interestRate: e?.interestRate,
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

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleClickDelete = (id) => {
    setDeleteID(id);
    setOpenModalDelete(true);
  };

  const handleAdd = async (time, interestRate) => {
    const data = {
      time: time,
      interestRate: interestRate,
    };
    if (
      !data.time ||
      data.time === "" ||
      !data.interestRate ||
      data.interestRate === ""
    ) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await addInterestRate(data).then(() => {
        setOpenModal(false);
        setReload(!reload);
      });
    }
  };

  const handleClickEdit = (data) => {
    setDataUpdate(data);
    setOpenModalUpdate(true);
  };

  const handleCloseModalDelete = () => {
    setDeleteID();
    setOpenModalDelete(false);
  };

  const handleDelete = async () => {
    if (deleteID) {
      props.handleLoading(true);
      await deleteInterestRate(deleteID).then((res) => {
        handleCloseModalDelete();
        setReload(!reload);
      });
    }
  };

  const handleChangeUpdate = (name, value) => {
    setDataUpdate((dataUpdate) => ({ ...dataUpdate, [name]: value }));
  };

  const handleUpdate = async () => {
    if (
      !dataUpdate.time ||
      dataUpdate.time === "" ||
      !dataUpdate.interestRate ||
      dataUpdate.interestRate === ""
    ) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await updateInterestRate(dataUpdate).then((res) => {
        handleCloseModalUpdate();
        setReload(!reload);
      });
    }
  };

  const handleCloseModalUpdate = () => {
    setDataUpdate();
    setOpenModalUpdate(false);
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ BIỂU LÃI SUẤT:</span>
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
          Thêm lãi suất
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
      <ModalAddInterestRate
        open={openModal}
        handleClose={handleClose}
        handleAdd={handleAdd}
      />
      <ModalDeleteComponent
        open={openModalDelete}
        title="Xác nhận xóa lãi suất"
        handleClose={handleCloseModalDelete}
        handleDelete={handleDelete}
      />
      <ModalUpdateInterestRate
        open={openModalUpdate}
        data={dataUpdate}
        handleChangeUpdate={handleChangeUpdate}
        handleUpdate={handleUpdate}
      />
    </Grid>
  );
}
