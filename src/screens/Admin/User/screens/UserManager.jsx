import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import {
  getCountUser,
  getUser,
  covertDate,
  searchUser,
} from "../../../../api/AdminAPI";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchComponent from "../../../../components/Search/Search.component";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import AddAlertIcon from "@material-ui/icons/AddAlert";
export default function UserManager(props) {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    props.handleLoading(true);
    await getCountUser().then((res) => {
      setCount(res.data);
    });
    await getUser(page).then((res) => {
      setUser(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  useEffect(async () => {
    props.handleLoading(true);
    await getUser(page).then((res) => {
      setUser(res.data);
      props.handleLoading(false);
    });
  }, [page]);
  const columns = [
    { field: "fullName", headerName: "HỌ VÀ TÊN", width: 200 },
    { field: "phoneNumber", headerName: "SỐ ĐIỆN THOẠI", width: 200 },
    { field: "idCard", headerName: "CMND/CCCD", width: 200 },
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
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              aria-label="noti"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickNoti(action.row?.action?._id);
              }}
            >
              <AddAlertIcon style={{ color: "orange" }} />
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
      idCard: e?.idCard,
      created: covertDate(e?.createAt),
      action: e,
    };
  });

  const handleClick = () => {
    history.push(AdminSlug.createUser);
  };

  const handleClickNoti = (id) => {
    history.push({
      pathname: AdminSlug.createNotificationAll,
      search: `?id=${id}`,
    });
  };

  const handleClickEdit = (id) => {
    history.push({
      pathname: AdminSlug.profileUser,
      search: `id=${id}`,
    });
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

  const handleSearch = async (search) => {
    if (search === "" || !search) {
      setReload(!reload);
    } else {
      await searchUser(search).then((res) => {
        setUser(res.data);
      });
    }
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ NGƯỜI DÙNG: ({count})</span>
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
          Tạo tài khoản
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
    </Grid>
  );
}
