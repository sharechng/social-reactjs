import React, { useState, useContext } from "react";
import clsx from "clsx";


import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  Grid,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";
import SwipeableTemporaryDrawer from "./RightDrawer";
import { GiWallet } from "react-icons/gi";
import Logo from "src/component/Logo";
import { BsChatLeftDots } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";
import SettingsContext from "src/context/SettingsContext";
import { AuthContext } from "src/context/Auth";
import { UserContext } from "src/context/User";
import SearchBox from "./SearchBox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import Ticker from "../HomeLayout/ticker";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
  // toolbar: {
  //   height: 70,
  // },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  desktopDrawer: {
    position: "absolute",
    right: 80,
    top: 30,
    width: 450,
    // background: theme.palette.primary.main,
    height: 450,
    [theme.breakpoints.down("sm")]: {
      width: 300,
      right: 0,
    },
  },
  iconbuttonHeader: {
    display: "flex",
    "& span": {
      // fontSize: "12px",
      // marginTop: "10px",
      "&.active": {
        color: "#e31a89",
      },
    },
  },
  iconbutton: {
    // color: theme.palette.,
    color: "#9F9F9F",
    position: "relative",
    marginRight: "5px",
    // [theme.breakpoints.down("xs")]: {
    //   marginRight: "0px",
    // },
    "& div": {
      height: "5px",
      width: "5px",
      borderRadius: "50%",
      backgroundColor: "#e31a89",
      position: "absolute",
      top: "7px",
      right: "8px",
    },
    // "@media(max-width:679px)": {
    //   display: "none"
    // }
  },
  mainheader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& .leftBox": {
      width: "246px",
      [theme.breakpoints.down("md")]: {
        width: "200px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "150px",
      },
      "& img": {
        [theme.breakpoints.down("xs")]: {
          paddingLeft: "0 !important",
        },
      },
    },
    "& .rightBox": {
      width: "calc(100% - 246px)",
      [theme.breakpoints.down("md")]: {
        width: "calc(100% - 200px)",
      },
      [theme.breakpoints.down("xs")]: {
        width: "calc(100% - 150px)",
      },
      "& .menubox": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      },
    },
  },
  searchBox: {
    marginLeft: "10px",
    "& input": {
      background: "#373636",
      borderRadius: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      marginLeft: "0px",
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData() {
  const auth = useContext(AuthContext);
  const userMail = auth?.userLoggedIn?.email;
  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const themeSeeting = useContext(SettingsContext);
  const [open, setOpen] = React.useState(false);
  const [message, setmessagee] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [socialLoginEmail, setSocialLoginEmail] = useState();
  const [formData, setFormData] = useState({
    message: "",
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formData, [name]: value };
    setFormData(temp);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTheme = (type) => {
    themeSeeting.saveSettings({
      theme: type,
    });
  };
  const searchBox = (
    <Box className={classes.searchBox}>
      <SearchBox />
    </Box>
  );

  const userRequest = async () => {
    setIsLoading(true);
    setIsSubmit(true);
    const formData = new FormData();
    formData.append("message", message);
    formData.append("email", userMail);
    if (message !== "" && message.length < 100) {
      try {
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.requestAdminByuser,
          // data: formData,
          data: {
            email: window.sessionStorage.getItem("email"),
            message: message,
          },
        });
        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          setIsLoading(false);
          setOpen(false);
          setmessagee("");
        }
      } catch (error) {
        toast.error(error?.response?.data?.responseMessage);
        setIsLoading(false);
        setOpen(false);
      }
    }
  };

  const status = localStorage.getItem("status");

  const checkStatus = window.localStorage.getItem("status");

  return (
    <>
      <Box style={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.mainheader}>
              <Box className="leftBox">
                <Logo
                  width="125"
                  style={{
                    paddingTop: "0px",
                    paddingLeft: "15px",
                    cursor: "pointer",
                  }}
                />
              </Box>

              <Box className="rightBox">
                <Grid container alignItems="center">
                  <Hidden xsDown>
                    <Grid item sm={5} md={4}>
                      {searchBox}
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={7} md={8}>
                    <Box className="menubox">
                      {checkStatus !== "ACTIVE" && (
                        <Button
                          color="secondary"
                          size="small"
                          variant="contained"
                          onClick={handleClickOpen}
                        >
                          Unblock
                        </Button>
                      )}
                      &nbsp; &nbsp;
                      <Box className={classes.iconbuttonHeader}>
                        <IconButton>
                          <span
                            style={{
                              fontSize: "14px",
                              marginRight: "5px",
                              marginTop: "5px",
                            }}
                            className={
                              location?.pathname === "/chat-history"
                                ? "active"
                                : ""
                            }
                            onClick={() => {
                              history.push("/chat-history");
                            }}
                          >
                            <BsChatLeftDots size={18} />
                            {auth?.unreadChats > 0 && <Box></Box>}
                          </span>
                        </IconButton>
                        <IconButton className={classes.iconbutton}>
                          <span
                            style={{ fontSize: "14px" }}
                            className={
                              location?.pathname === "/wallet" ? "active" : ""
                            }
                            onClick={() => {
                              history.push("/wallet");
                            }}
                          >
                            <GiWallet size={18} />
                          </span>
                        </IconButton>
                        {auth?.userData?.userType === "User" && (
                          <IconButton
                            className={classes.iconbutton}
                            onClick={() => {
                              history.push("/notification-list");
                            }}
                          >
                            <span
                              style={{ fontSize: "14px", marginRight: "5px" }}
                              className={
                                location?.pathname === "/notification-list"
                                  ? "active"
                                  : ""
                              }
                            >
                              <MdNotifications size={18} />
                              {auth?.unReadNotification > 0 && <Box></Box>}
                            </span>
                          </IconButton>
                        )}
                      </Box>
                      <SwipeableTemporaryDrawer />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Hidden smUp>
            <Grid item xs={12}>
              <Box>{searchBox}</Box>
            </Grid>
          </Hidden>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Unblock Request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Unblock from this website, please enter your message here. We
              will send updates occasionally.
            </DialogContentText>

            <TextField
              // autoFocus
              // margin="dense"
              variant="outlined"
              label="Message"
              multiline
              name="message"
              value={message}
              maxRows={4}
              error={
                (isSubmit && message == "") ||
                (message !== "" && message.length > 100)
              }
              fullWidth
              // onChange={_onInputChange}
              onChange={(e) => setmessagee(e.target.value)}
            />
            <FormHelperText error>
              {isSubmit && message == "" && "Message is required"}
              {message !== "" &&
                message.length > 100 &&
                "Please enter valid message, message should be greater than or equal to 100"}
            </FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={userRequest} color="secondary" variant="contained">
              Request
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Ticker/>

      {/* <Hidden smUp> */}
      {/* <Box>{searchBox}</Box> */}
      {/* </Hidden> */}
    </>
  );
}
