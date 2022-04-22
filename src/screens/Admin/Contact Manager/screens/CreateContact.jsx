import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {
  createContact,
  createUser,
  randomPassword,
} from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import ImagePreivewsComponent from "../../../../components/Image Previews/ImagePreviews.component";

export default function CreateContact(props) {
  const history = useHistory();
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    position: "",
    workAddress: "",
  });
  const [thumbnail, setThumnail] = useState();

  useEffect(() => {
    props.handleLoading(false);
  }, []);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
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
        <span className="title">TẠO LIÊN HỆ MỚI: </span>
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
              label="Chức vụ"
              variant="outlined"
              style={{ width: "100%" }}
              name="position"
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
