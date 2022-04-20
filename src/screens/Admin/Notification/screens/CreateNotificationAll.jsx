import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { createNotification, createUser } from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import queryString from "query-string";
import ModalNewsComponent from "../components/ModalNews.component";
import "./notification.css";

export default function CreateNotificationAll(props) {
  const history = useHistory();
  const query = queryString.parse(props.location.search);
  const id = query.id;
  const [value, setValue] = React.useState("1");
  const [data, setData] = useState({
    receiverID: "",
    title: "",
    content: "",
    newsID: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [dataNews, setDataNews] = useState({
    newsID: "",
    title: " ",
  });
  useEffect(() => {
    props.handleLoading(false);
    if (id) {
      setData((data) => ({ ...data, receiverID: id }));
    }
  }, [id]);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      data.title === "" ||
      !data.title ||
      data.content === "" ||
      !data.content
    ) {
      alert("Xin vui lòng nhập đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      data.type = value;
      data.newsID = dataNews.newsID;
      await createNotification(data).then((res) => {
        history.push(AdminSlug.notification);
      });
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickModalNews = () => {
    setOpenModal(true);
  };
  const handleCloseModalNews = () => {
    setOpenModal(false);
  };

  const handleSelectNews = (data) => {
    setDataNews({ newsID: data._id, title: data.title });
    setOpenModal(false);
  };
  return (
    <Grid>
      <div className="head-title">
        <span className="title">
          TẠO THÔNG BÁO ĐẾN {id === "all" ? "TẤT CẢ" : "CÁ NHÂN"}:{" "}
        </span>
      </div>
      <div className="mt-3">
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="Tiêu đề"
              variant="outlined"
              style={{ width: "100%" }}
              name="title"
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
            <TextField
              id="outlined-basic"
              label="Nội dung"
              variant="outlined"
              style={{ width: "100%" }}
              name="content"
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-3">
          <Grid item lg={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Loại thông báo:</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Thông báo"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Bài viết"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        {value === "2" ? (
          <Grid container spacing={2} className="mt-2">
            <Grid item lg={6}>
              <TextField
                id="outlined-basic"
                label="Bài viết"
                variant="outlined"
                style={{ width: "100%" }}
                name="newsID"
                onChange={handleChangeInput}
                onClick={handleClickModalNews}
                defaultValue={dataNews?.title}
                key={dataNews?.title}
              />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}

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
              Tạo thông báo
            </Button>
          </Grid>
        </Grid>
      </div>
      <ModalNewsComponent
        open={openModal}
        handleClose={handleCloseModalNews}
        handleSelectNews={handleSelectNews}
      />
    </Grid>
  );
}
