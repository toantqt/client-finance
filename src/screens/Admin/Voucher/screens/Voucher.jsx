import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { getCategoryVoucher, covertDate } from "../../../../api/AdminAPI";
import TableComponent from "../../../../components/Table/Table.component";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";

export default function Voucher(props) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    props.handleLoading(true);
    await getCategoryVoucher().then((res) => {
      setData(res.data);
    });
    props.handleLoading(false);
  }, []);

  const columns = [
    { field: "title", headerName: "TIÊU ĐỀ", width: 400 },
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
                // handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickNews(action.row?.action?._id);
              }}
            >
              <OpenInNewIcon style={{ color: "green" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleChangePage = (page) => {
    setPage(page);
  };

  const rows = data.map((e, index) => {
    return {
      id: index,
      title: e?.titleVoucher,
      created: covertDate(e?.createAt),
      action: e,
    };
  });

  const handleClickNews = (id) => {
    history.push({
      pathname: AdminSlug.newsManager,
      search: `?id=${id}`,
    });
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ GÓI ƯU ĐÃI</span>
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
