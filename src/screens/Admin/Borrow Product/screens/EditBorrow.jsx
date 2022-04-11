import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  getDetailsBorrowProduct,
  updateBorrow,
} from "../../../../api/AdminAPI";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import AdminSlug from "../../../../resources/AdminSlug";
export default function EditBorow(props) {
  const history = useHistory();
  const id = props.match.params.id;
  const [borrow, setBorrow] = useState();
  const [data, setData] = useState({
    duration: "",
    percent: "",
    paymentMethod: "",
    borrowMethod: "",
  });
  const [value, setValue] = useState();
  useEffect(() => {
    props.handleLoading(true);
    if (id) {
      getDetailsBorrowProduct(id).then((res) => {
        setBorrow(res.data.borrowProduct[0]);
        setData(res.data.details);
        setValue(res.data);
      });
      props.handleLoading(false);
    }
  }, [id]);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      data.duration === "" ||
      data.borrowMethod === "" ||
      data.paymentMethod === "" ||
      data.percent === ""
    ) {
      alert("Xin vui lòng nhập đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await updateBorrow(borrow._id, data).then((res) => {
        history.push(AdminSlug.borrowProduct);
      });
    }
  };
  return (
    <Grid>
      <div className="head-title">
        <span className="title">Cập nhật thông tin - {borrow?.name}:</span>
      </div>
      <Grid container spacing={2} className="mt-3">
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Thời hạn vay"
            variant="outlined"
            style={{ width: "100%" }}
            key={value?.details?.duration}
            defaultValue={value?.details?.duration}
            name="duration"
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Lãi suất %"
            variant="outlined"
            style={{ width: "100%" }}
            key={value?.details?.percent}
            defaultValue={value?.details?.percent}
            name="percent"
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Phương thức trả"
            variant="outlined"
            style={{ width: "100%" }}
            key={value?.details?.paymentMethod}
            defaultValue={value?.details?.paymentMethod}
            name="paymentMethod"
            onChange={handleChange}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Phương thức vay"
            variant="outlined"
            style={{ width: "100%" }}
            key={value?.details?.borrowMethod}
            defaultValue={value?.details?.borrowMethod}
            name="borrowMethod"
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <div style={{ marginTop: "70px" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          style={{ float: "right" }}
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </div>
    </Grid>
  );
}
