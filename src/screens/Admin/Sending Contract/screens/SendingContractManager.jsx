import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import ModalUploadFileComponent from "../../../../components/Modal/ModalUploadFile.component";
import {
  getCountSendingContract,
  getSendingContract,
  searchSendingContract,
} from "../../../../api/AdminAPI";
import SearchComponent from "../../../../components/Search/Search.component";
export default function SendingContractManager(props) {
  const [listsSending, setListsSending] = useState([]);
  const [loan, setLoan] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    props.handleLoading(true);
    await getCountSendingContract().then((res) => {
      setCount(res.data);
    });
    await getSendingContract(page).then((res) => {
      setLoan(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  useEffect(async () => {
    props.handleLoading(true);
    await getSendingContract(page).then((res) => {
      setLoan(res.data);
      props.handleLoading(false);
    });
  }, [page]);
  const columns = [
    { field: "fullName", headerName: "HỌ VÀ TÊN", width: 200 },
    { field: "code", headerName: "MÃ SỔ TIẾT KIỆM", width: 200 },
    { field: "deposits", headerName: "SỐ DƯ TIỀN GỬI", width: 200 },
    { field: "sentDate", headerName: "NGÀY GỬI", width: 150 },
    { field: "dueDay", headerName: "NGÀY ĐÁO HẠN", width: 170 },
    { field: "yearPercent", headerName: "LÃI SUẤT/NĂM", width: 200 },
    { field: "nextProfit", headerName: "LÃI DỰ KIẾN ", width: 200 },
  ];

  const rows = loan.map((e, index) => {
    console.log(e);
    return {
      id: index,
      fullName: e?.fullName,
      code: e?.code,
      deposits: e?.deposits.toLocaleString("it-IT"),
      sentDate: e?.sentDate,
      dueDay: e?.dueDay,
      yearPercent: e?.yearPercent.toLocaleString("it-IT"),
      nextProfit: parseInt(e?.nextProfit.toFixed(0)).toLocaleString("it-IT"),
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

  const handleSearch = async (search) => {
    if (!search || search === "") {
      alert("Vui lòng nhập thông tin tìm kiếm");
    } else {
      const data = {
        search: search,
      };
      await searchSendingContract(data).then((res) => {
        if (res.data) {
          setLoan([res.data]);
        } else {
          setLoan([]);
        }
      });
    }
  };
  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ HỢP ĐỒNG GỬI: ({count})</span>
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
      <div className="mt-2">
        <SearchComponent handleSearch={handleSearch} />
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
        status="sending"
      />
    </Grid>
  );
}
