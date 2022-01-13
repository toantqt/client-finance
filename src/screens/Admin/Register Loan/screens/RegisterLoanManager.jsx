import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import ModalUploadFileComponent from "../../../../components/Modal/ModalUploadFile.component";
import {
  getCountRegisterLoan,
  getRegisterLoan,
  covertDate,
} from "../../../../api/AdminAPI";
import SearchComponent from "../../../../components/Search/Search.component";
export default function RegisterLoanManager(props) {
  const [listsSending, setListsSending] = useState([]);
  const [loan, setLoan] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    props.handleLoading(true);
    await getCountRegisterLoan().then((res) => {
      setCount(res.data);
    });
    await getRegisterLoan(page).then((res) => {
      setLoan(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  useEffect(async () => {
    props.handleLoading(true);
    await getRegisterLoan(page).then((res) => {
      setLoan(res.data);
      props.handleLoading(false);
    });
  }, [page]);
  const columns = [
    { field: "fullName", headerName: "HỌ VÀ TÊN", width: 200 },
    { field: "phoneNumber", headerName: "SỐ ĐIỆN THOẠI", width: 200 },
    { field: "money", headerName: "SỐ TIỀN CẦN VAY", width: 250 },
    { field: "created", headerName: "NGÀY GỬI ĐĂNG KÍ", width: 250 },
  ];

  const rows = loan.map((e, index) => {
    return {
      id: index,
      fullName: e?.fullName,
      phoneNumber: e?.phoneNumber,
      money: e?.money.toLocaleString("it-IT"),
      created: covertDate(e?.createAt),
    };
  });

  const handleClick = () => {
    setOpenModal(true);
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
  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ ĐĂNG KÍ VAY VỐN: ({count})</span>
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
