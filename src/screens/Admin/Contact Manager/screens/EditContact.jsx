import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {
  createContact,
  createUser,
  getDetailsContact,
  randomPassword,
} from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import ImagePreivewsComponent from "../../../../components/Image Previews/ImagePreviews.component";
import queryString from "query-string";
export default function EditContact(props) {
  const query = queryString.parse(props.location.search);
  const id = query.id;
  const history = useHistory();
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    position: "",
    workAddress: "",
  });
  const [newData, setNewData] = useState();
  const [thumbnail, setThumnail] = useState();

  useEffect(() => {
    props.handleLoading(true);
    if (id) {
      getDetailsContact(id).then((res) => {
        setData(res.data);
        setNewData(res.data);
        setThumnail(res.data.avatar);
      });
      props.handleLoading(false);
    }
  }, [id]);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setNewData((newData) => ({ ...newData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !thumbnail ||
      data.phoneNumber === "" ||
      !data.phoneNumber ||
      data.position === "" ||
      !data.position ||
      data.fullName === "" ||
      !data.fullName
    ) {
      alert("Xin vui lòng nhập đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      console.log(data);
      await createContact(data, thumbnail).then((res) => {
        history.push(AdminSlug.contactManager);
      });
    }
  };

  const handleChangeThumbnail = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setThumnail({ url: reader.result, file: file });
        };
        reader.readAsDataURL(file);
      });
    }
  };
  return (
    <Grid>
      <div className="head-title">
        <span className="title">CẬP NHẬT LIÊN HỆ: </span>
      </div>
      <div className="mt-3">
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <div className="mb-3">
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                Hình ảnh:
              </span>
            </div>
            <ImagePreivewsComponent
              url={thumbnail}
              handleChangeImage={handleChangeThumbnail}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="Họ và tên"
              variant="outlined"
              style={{ width: "100%" }}
              name="fullName"
              defaultValue={data.fullName}
              key={data.fullName}
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
              defaultValue={data.phoneNumber}
              key={data.phoneNumber}
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="Chức vụ"
              variant="outlined"
              style={{ width: "100%" }}
              name="position"
              defaultValue={data.position}
              key={data.position}
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
              name="workAddress"
              defaultValue={data.workAddress}
              key={data.workAddress}
              onChange={handleChangeInput}
            />
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
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
