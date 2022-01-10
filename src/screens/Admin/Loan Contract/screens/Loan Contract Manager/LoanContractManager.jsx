import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../../components/Table/Table.component";
import ModalUploadFileComponent from "../../../../../components/Modal/ModalUploadFile.component";
import { getCountLoan, getLoan } from "../../../../../api/AdminAPI";
export default function LoanContractManager(props) {
  const [loan, setLoan] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    props.handleLoading(true);
    await getCountLoan().then((res) => {
      setCount(res.data);
    });
    await getLoan(page).then((res) => {
      setLoan(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  useEffect(async () => {
    props.handleLoading(true);

    await getLoan(page).then((res) => {
      setLoan(res.data);
      props.handleLoading(false);
    });
  }, [page]);
  const columns = [
    { field: "fullName", headerName: "HỌ VÀ TÊN", width: 200 },
    { field: "contractNumber", headerName: "SỐ HỢP ĐỒNG VAY", width: 200 },
    { field: "loanMoney", headerName: "SỐ TIỀN VAY", width: 150 },
    { field: "created", headerName: "NGÀY VAY", width: 150 },
    { field: "dueDay", headerName: "NGÀY ĐÁO HẠN", width: 170 },
    { field: "debt", headerName: "DƯ NỢ HIỆN TẠI", width: 200 },
    { field: "nextProfit", headerName: "LÃI DỰ KIẾN KÌ TIẾP THEO", width: 230 },
  ];

  const rows = loan.map((e, index) => {
    console.log(e);
    return {
      id: index,
      fullName: e?.fullName,
      contractNumber: e?.contractNumber,
      loanMoney: e?.loanMoney.toLocaleString("it-IT"),
      created: e?.created,
      dueDay: e?.dueDay,
      debt: e?.debt.toLocaleString("it-IT"),
      nextProfit: e?.nextProfit.toLocaleString("it-IT"),
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
        <span className="title">QUẢN LÝ HỢP ĐỒNG VAY: ({count})</span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PublishIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClick}
        >
          Nhập từ file
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
      <ModalUploadFileComponent
        open={openModal}
        handleClose={handleClose}
        handleLoading={props.handleLoading}
        handleReload={handleReload}
      />
    </Grid>
  );
}
