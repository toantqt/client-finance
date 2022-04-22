import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import {
  getListsContact,
  covertDate,
  searchUser,
  deleteContact,
  searchContact,
} from "../../../../api/AdminAPI";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchComponent from "../../../../components/Search/Search.component";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ModalDeleteComponent from "../../../../components/Modal/ModelDelete.component";

export default function ContactManager(props) {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [deleteID, setDeleteID] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    await getListsContact().then((res) => {
      setUser(res.data);
      setCount(res.data.length);
    });
    props.handleLoading(false);
  }, [reload]);

  const columns = [
    { field: "fullName", headerName: "HỌ VÀ TÊN", width: 200 },
    { field: "phoneNumber", headerName: "SỐ ĐIỆN THOẠI", width: 200 },
    { field: "position", headerName: "CHỨC VỤ", width: 200 },
    { field: "address", headerName: "ĐỊA CHỈ", width: 200 },
    {
      field: "action",
      headerName: "CHỨC NĂNG",
      width: 180,
      renderCell: (action) => {
        return (
          <>
            {/* <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton> */}

            <IconButton
              aria-label="noti"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickDelete(action.row?.action?._id);
              }}
            >
              <DeleteForeverIcon style={{ color: "red" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = user.map((e, index) => {
    return {
      id: index,
      fullName: e?.fullName,
      phoneNumber: e?.phoneNumber,
      position: e?.position,
      created: covertDate(e?.createAt),
      action: e,
    };
  });

  const handleClick = () => {
    history.push(AdminSlug.createContact);
  };

  const handleClickDelete = (id) => {
    setDeleteID(id);
    setOpenModal(true);
  };

  const handleClickEdit = (id) => {
    history.push({
      pathname: AdminSlug.editContact,
      search: `id=${id}`,
    });
  };

  const handleClose = () => {
    setDeleteID();
    setOpenModal(false);
  };

  const handleReload = () => {
    setReload(!reload);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleSearch = async (search) => {
    if (search === "" || !search) {
      setReload(!reload);
    } else {
      await searchContact(search).then((res) => {
        setUser(res.data);
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteID) {
      await deleteContact(deleteID).then((res) => {
        handleClose();
        setReload(!reload);
      });
    }
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ LIÊN HỆ: ({count})</span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PersonAddIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClick}
        >
          Tạo liên hệ
        </Button>
      </div>
      <div className="mt-2">
        <SearchComponent
          title="Tìm kiếm theo số điện thoại"
          handleSearch={handleSearch}
        />
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
        title="Xác nhận xóa liên hệ"
        open={openModal}
        handleClose={handleClose}
        handleDelete={handleConfirmDelete}
      />
    </Grid>
  );
}
