import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { createUser, randomPassword } from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";

export default function CreateUser(props) {
  const history = useHistory();
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    idCard: "",
    password: "",
    address: "",
  });
  useEffect(() => {
    props.handleLoading(false);
  }, []);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      data.phoneNumber === "" ||
      !data.phoneNumber ||
      data.idCard === "" ||
      !data.idCard ||
      data.fullName === "" ||
      !data.fullName ||
      data.password === "" ||
      !data.password ||
      data.address === "" ||
      !data.address
    ) {
      alert("Xin vui lòng nhập đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await createUser(data).then((res) => {
        history.push(AdminSlug.userManager);
      });
    }
  };

  const handleClickRandomPassword = () => {
    setData((data) => ({ ...data, password: randomPassword(6) }));
  };
  return (
    <Grid>
      <div className="head-title">
        <span className="title">TẠO TÀI KHOẢN MỚI: </span>
      </div>
      <div className="mt-3">
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
              style={{ width: "100%" }}
              name="fullName"
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              style={{ width: "100%" }}
              name="phoneNumber"
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="CCCD"
              variant="outlined"
              style={{ width: "100%" }}
              name="idCard"
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              style={{ width: "100%" }}
              name="address"
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-3">
          <Grid item lg={5}>
            <TextField
              id="outlined-basic"
              label="Mật khẩu"
              variant="outlined"
              style={{ width: "100%" }}
              name="password"
              defaultValue={data.password}
              key={data.password}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item lg={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              style={{ backgroundColor: "green" }}
              onClick={handleClickRandomPassword}
            >
              Tạo MK
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
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
      </div>
    </Grid>
  );
}
