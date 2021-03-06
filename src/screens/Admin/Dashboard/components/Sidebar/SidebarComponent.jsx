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
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SendIcon from "@material-ui/icons/Send";
import ListAltIcon from "@material-ui/icons/ListAlt";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SubjectIcon from "@material-ui/icons/Subject";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
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
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.registerLoan)}
      >
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="????ng k?? vay v???n" className={classes.title} />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.loanBrief)}
      >
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText primary="H??? s?? vay v???n" className={classes.title} />
      </ListItem>
      <ListItem button onClick={handleClick3}>
        <ListItemIcon>
          <FindInPageIcon />
        </ListItemIcon>
        <ListItemText primary="Qu???n l?? h???p ?????ng" className={classes.title} />
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
              <FeaturedPlayListIcon />
            </ListItemIcon>
            <ListItemText primary="Vay" className={classes.title} />
          </ListItem>
          <ListItem
            button
            className={
              classes.nested + (param == "orderManager" ? " active" : "")
            }
            onClick={() => handleClickSlugLibrary(AdminSlug.sendingContract)}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Ti???t ki???m" className={classes.title} />
          </ListItem>
        </List>
      </Collapse>
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.voucherManager)}
      >
        <ListItemIcon>
          <CardGiftcardIcon />
        </ListItemIcon>
        <ListItemText primary="G??i ??u ????i" className={classes.title} />
      </ListItem>

      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.borrowProduct)}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Cho vay" className={classes.title} />
      </ListItem>

      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.depositsManager)}
      >
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Ti???n g???i" className={classes.title} />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.interestRateManager)}
      >
        <ListItemIcon>
          <TrendingUpIcon />
        </ListItemIcon>
        <ListItemText primary="Bi???u l??i su???t" className={classes.title} />
      </ListItem>

      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.notification)}
      >
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary="Qu???n l?? th??ng b??o" className={classes.title} />
      </ListItem>

      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.userManager)}
      >
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Qu???n l?? ng?????i d??ng" className={classes.title} />
      </ListItem>

      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.contactManager)}
      >
        <ListItemIcon>
          <ContactPhoneIcon />
        </ListItemIcon>
        <ListItemText primary="Qu???n l?? li??n h???" className={classes.title} />
      </ListItem>
    </List>
    // </div>
  );
}
