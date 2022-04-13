import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import SaveIcon from "@material-ui/icons/Save";

import {
  profileUser,
  covertDate,
  resetPassword,
  updateProfile,
  randomPassword,
} from "../../../../api/AdminAPI";
import "./user.css";
import ModalUpdatePassword from "../../../../components/Modal/ModalUpdatePassword.component";

export default function ProfileUser(props) {
  const query = queryString.parse(props.location.search);
  const id = query.id;
  const [data, setData] = useState();
  const [showModalPass, setShowModalPass] = useState(false);
  const [reload, setReload] = useState(false);
  const [dataUser, setDataUser] = useState({
    phoneNumber: "",
    idCard: "",
    sendingContractID: "",
    loanContractID: "",
  });
  const [password, setPassword] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    if (id) {
      await profileUser(id).then((res) => {
        setData(res.data);
        setDataUser({
          phoneNumber: res.data.phoneNumber,
          idCard: res.data.idCard,
          sendingContractID: res.data.sendingContractID,
          loanContractID: res.data.loanContractID,
        });
      });
      props.handleLoading(false);
    }
  }, [id, reload]);
  const handleClickPass = () => {
    setPassword(randomPassword(6));
    setShowModalPass(true);
  };
  const handleClosePass = () => {
    setShowModalPass(false);
  };
  const handleUpdatePass = async () => {
    if (password === "" || !password) {
      alert("Xin vui lòng nhập mật khẩu");
    } else {
      const data = {
        password: password,
        userID: id,
      };
      await resetPassword(data).then((res) => {
        setShowModalPass(false);
        setReload(!reload);
      });
    }
  };

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setDataUser((dataUser) => ({ ...dataUser, [name]: value }));
  };

  const handleSubmit = async (event) => {
    if (dataUser.phoneNumber === "" || !dataUser.phoneNumber) {
      alert("Số điện thoại không được để trống");
    } else if (dataUser.idCard === "" || !dataUser.idCard) {
      alert("CCCD không được để trống");
    } else {
      props.handleLoading(true);
      await updateProfile(id, dataUser).then((res) => {
        setReload(!reload);
      });
    }
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">THÔNG TIN TÀI KHOẢN: </span>
      </div>
      <div className="mt-4">
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <div className="user-img">
              <img src={data?.profile?.avatar} alt="" width="100%" />
              <div className="btn-reset-pw mt-3">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<LockOpenIcon />}
                  style={{
                    textTransform: "none",
                    backgroundColor: "orange",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={handleClickPass}
                >
                  Reset mật khẩu
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="Họ tên"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={data?.fullName}
                  key={data?.fullName}
                  disabled
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={data?.phoneNumber}
                  key={data?.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="CCCD"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={data?.idCard}
                  key={data?.idCard}
                  name="idCard"
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="Ngày sinh"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={covertDate(data?.birthday)}
                  key={data?.birthday}
                  disabled
                />
              </Grid>

              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="Tên đăng nhập"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={data?.username}
                  key={data?.username}
                  disabled
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="Địa chỉ"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={data?.profile?.address}
                  key={data?.profile?.address}
                  disabled
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="Mã hợp đồng vay"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={data?.loanContractID}
                  key={data?.loanContractID}
                  name="loanContractID"
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  id="outlined-basic"
                  label="Mã hợp đồng gửi"
                  variant="outlined"
                  style={{ width: "100%" }}
                  defaultValue={data?.sendingContractID}
                  key={data?.sendingContractID}
                  name="sendingContractID"
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item lg={12} style={{ marginTop: "20px", width: "100%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                  style={{ float: "right " }}
                  onClick={handleSubmit}
                >
                  Cập nhật
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <ModalUpdatePassword
        open={showModalPass}
        handleClose={handleClosePass}
        handleUpdatePass={handleUpdatePass}
        password={password}
        username={data?.username}
      />
    </Grid>
  );
}
