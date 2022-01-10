import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AdminSlug from "../../../../../resources/AdminSlug";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import CategoryIcon from "@material-ui/icons/Category";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import LineWeightIcon from "@material-ui/icons/LineWeight";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TimerIcon from "@material-ui/icons/Timer";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import StoreIcon from "@material-ui/icons/Store";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import "./sidebar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: "0px !important",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    color: "black",
  },
}));

export default function SideBarComponent(props) {
  const history = useHistory();
  const classes = useStyles();

  const [param, setParam] = React.useState("overview");
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClickSlug = (param, url) => {
    setParam(param);
    history.push(url);
  };
  const handleClickSlugLibrary = (url) => {
    setParam(param);
    history.push({
      pathname: url,
    });
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  return (
    // <div>
    //   <div className="header-logo">
    //     <img src={logo} alt="" width="100%" />
    //   </div>
    <List style={{ padding: "0px !important" }} className="sidebar">
      <ListItem button onClick={handleClick3}>
        <ListItemIcon>
          <FindInPageIcon />
        </ListItemIcon>
        <ListItemText primary="Quản lý hợp đồng" className={classes.title} />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={
              classes.nested + (param == "orderManager" ? " active" : "")
            }
            onClick={() => handleClickSlugLibrary(AdminSlug.loanContract)}
          >
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary="Hợp đồng vay" className={classes.title} />
          </ListItem>
          <ListItem
            button
            className={
              classes.nested + (param == "orderManager" ? " active" : "")
            }
            onClick={() => handleClickSlugLibrary(AdminSlug.dealerManager)}
          >
            <ListItemIcon>
              <BeenhereIcon />
            </ListItemIcon>
            <ListItemText primary="Hợp đồng gửi" className={classes.title} />
          </ListItem>
        </List>
      </Collapse>
    </List>
    // </div>
  );
}
