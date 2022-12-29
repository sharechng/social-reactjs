import React, { useContext, useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Paper,
  Grid,
  TextField,
  Box,
  Button,
  IconButton,
  Hidden,
} from "@material-ui/core";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiLink } from "react-icons/hi";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FaEllipsisH } from "react-icons/fa";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MdCancel } from "react-icons/md";
import { AuthContext } from "src/context/Auth";
import { useHistory, useLocation } from "react-router-dom";
import Apiconfigs, { socketURL, websiteName } from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { getBase64, sortAddress } from "src/utils";
import moment from "moment";
import Picker from "emoji-picker-react";
import SocialShareBox from "src/component/SocialShareBox";
import CopyToClipboard from "react-copy-to-clipboard";
import DataLoading from "src/component/DataLoading";
import Switch from "@material-ui/core/Switch";
import CryptoJS from "crypto-js";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  emojiBox: {
    position: "absolute",
    width: "100%",
    bottom: "100%",
    right: "-65% !important",
    [theme.breakpoints.down("md")]: {
      right: "-59% !important",
    },
    [theme.breakpoints.down("sm")]: {
      right: "-68% !important",
    },
  },

  menuShare: {
    position: "absolute",
    right: "16px",
    top: "16px",
    [theme.breakpoints.down("xs")]: {
      right: "0px",
      top: "0px",
    },
  },

  sharemodal: {
    "& button": {
      textAlign: "center",
      "& svg": {
        fontSize: "25px",
      },
    },
  },

  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      margin: 2,
    },
    "& h6": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "&:hover": {
      backgroundColor: "#3F3D3D",
    },
    "@media(max-width:959px)": {
      "&:hover": {
        "& h6": {
          display: "block",
        },
      },
    },
    "& .activeBoxs": {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
  paper: {
    backgroundColor: "black",
    "& .bodyBox": {
      height: "60vh",
      overflowY: "scroll",
      padding: "15px",
      [theme.breakpoints.down("sm")]: {
        height: "45vh",
      },
    },
    "& .footerBox": {
      padding: "15px",
      borderTop: "1px solid #242526",
      position: "relative",
      "& button": {
        boxSizing: "border-box",
        borderRadius: "7px",
        width: "100%",
        height: "30px !important",
        width: "30px !important",
        fontSize: "25px",
        [theme.breakpoints.down("xs")]: {
          height: "30px",
          fontSize: "18px",
        },
      },
      "& .linkBox": {
        position: "relative",
        height: "100%",
        width: "50px",
        textAlign: "center",
        "& input": {
          position: "absolute",
          width: "100%",
          left: 0,
          top: 0,
          opacity: 0,
          height: "100%",
        },
      },
    },
    "& .headerbox": {
      display: "flex",
      alignItems: "center",
      padding: "15px",
      "& img": {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",

        [theme.breakpoints.down("xs")]: {
          width: "40px",
          height: "40px",
        },
      },
    },
    "& .searchBox": {
      // display: "flex",
      padding: "10px",
    },
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "green",
  },
  outer: {
    height: "48px",
    width: "100%",
    borderRadius: "5px",
    backgroundColor: "#373636",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    [theme.breakpoints.down("xs")]: {
      height: "30px",
    },
  },
  box1: {
    display: "flex",
    marginBottom: "30px",
    "& img": {
      borderRadius: "50%",
      // height: "35px",
      width: "35px",
      marginBottom: "0px",
      [theme.breakpoints.down("xs")]: {
        height: "30px",
        width: "30px",
      },
    },
  },
  mess: {
    backgroundColor: "#242526",
    padding: "10px",
    borderRadius: "10px 10px 0px 10px",
    position: "relative",
    "& small": {
      position: "absolute",
      color: "#BBB6B6",
      bottom: "-18px",
      right: 0,
      fontSize: "10px",
    },
    "& button": {
      position: "absolute",
      fontSize: "22px",
      top: "50%",
      opacity: 1,
      left: "-46px",
      transform: "translateY(-50%)",
      width: "40px",
    },
  },
  mess1: {
    backgroundColor: "#E31A89",
    padding: "10px",
    borderRadius: " 10px 10px 10px 0px",
    position: "relative",
    "& small": {
      position: "absolute",
      color: "#BBB6B6",
      bottom: "-18px",
      left: 0,
      fontSize: "10px",
    },
    "& button": {
      position: "absolute",
      fontSize: "22px",
      top: "50%",
      opacity: 1,
      width: "40px",
      right: "-46px",
      transform: "translateY(-50%)",
    },
  },
  chatLeftBox: {
    overflowY: "scroll",
    height: "74vh",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "69vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      display: "flex",
      overflowX: "scroll",
    },

    "& .textmsg": {
      fontSize: "12px",
      color: "#838282",
      width: "100%",
      maxWidth: "130px",
      overflow: "hidden",
      fontWeight: "300",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    "& .chatBox": {
      minWidth: "14px",
      height: "14px",
      borderRadius: "2px",
      backgroundColor: "red",
      textAlign: "center",
      width: " 14px",
      fontSize: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        top: 0,
        left: 0,
      },
    },
    "& .statusBox": {
      height: "10px",
      borderRadius: "50%",
      width: "10px",
      backgroundColor: "#0AB506",
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        top: 0,
        left: 0,
      },
    },
    "& .chatprofile": {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      position: "relative",

      "& img": {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
      },
    },
  },
  chatimgBox: {
    display: "flex",
    alignItems: "center",
  },
  chatimgBoxicon: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    display: "flex",
    alignItems: "center",
  },
  nameSection: {
    marginLeft: "16px",
    "@media(max-width:959px)": {
      marginLeft: "3px",
      "&:hover": {},
    },
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #484849 !important",
    backgroundColor: "#101010 !important",
    minWidth: "120px !important",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

// const socket = window.io("https://node-social.mobiloitte.org/");
// const socket = window.io(socketURL);

function isEmpty(obj) {
  if (obj) {
    return Object.keys(obj).length === 0;
  } else {
    return true;
  }
}

function ChatList() {
  const classes = useStyles();
  const user = useContext(AuthContext);

  console.log("user------", user);
  const location = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChat, setSelectedChat] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [receiverId, setReceiverId] = useState("");
  const [showChatHistory, setShowChatHistory] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [onlineUsersList, setOnlineUsersList] = useState([]);
  const [showChat1, setShowChat1] = useState({});

  console.log("showChat1----", showChat1);

  const [showChat, setShowChat] = useState({});
  const [newuserDetails, setNewuserDetails] = useState();
  const [isNewLoading, setIsNewLoading] = useState(true);
  const [image, setimage] = useState();
  const [openSendImage, setOpenSendImage] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [searchUserName, setSearchUserName] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  console.log("searchUserList", searchUserList);
  const [checked, setChecked] = React.useState(undefined);
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [background, setBackground] = useState(true);

  console.log("showUser----", showUser);

  useEffect(() => {
    if (user.userData && user.chatMessageData) {
      if (!isNewLoading) {
        setSenderId(user.userData._id);
      }
      chatHistorygetSocket();
      // onlineUser(user.userData._id);
    }
  }, [user.userData, newuserDetails, user.chatMessageData]);

  useEffect(() => {
    if (newuserDetails) {
      // setSearchUserList([]);
      setSearchUserName("");
    }
  }, [newuserDetails]);

  const chatHistorygetSocket = () => {
    if (user.chatMessageData) {
      let messageList = user.chatMessageData;
      let checkNew = undefined;
      if (newuserDetails) {
        checkNew = messageList.filter(
          (data) =>
            data.senderId._id === newuserDetails._id ||
            data.receiverId._id === newuserDetails._id
        );
        if (checkNew.length === 0) {
          let obj = {
            messages: [],
            receiverId: user.userData,
            senderId: newuserDetails,
            unReadCount: 0,
          };
          messageList.splice(0, 0, obj);
        }
      }
      if (newuserDetails) {
        if (checkNew?.length > 0) {
          setShowChat1(checkNew[0]);
        } else {
          setShowChat1(messageList[0]);
        }
      } else if (isEmpty(showChat1) && isEmpty(newuserDetails)) {
        setShowChat1(messageList[0]);
      } else if (!isEmpty(showChat1)) {
        const lastChatData = user.chatMessageData.filter(
          (data) => data._id === showChat1?._id
        );
        setShowChat1(lastChatData[0]);
      }
      setShowChatHistory(messageList);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (!isEmpty(showChat1)) {
      setIsUploadingData(false);
    }
    return () => {
      setIsUploadingData(true);
    };
  }, [showChat1]);

  const encryptMessageHandler = async () => {
    try {
      const finalChatData = await Promise.all(
        showChat1?.messages?.map(async (chat, i) => {
          if (chat.mediaType == "text") {
            let data = { ...chat };
            const chatObj = chat.message;

            const userIddd =
              data?.receiverId == showChat1?.senderId._id
                ? showChat1?.receiverId._id
                : showChat1?.senderId._id;

            const bytes = await CryptoJS.AES.decrypt(chatObj, userIddd);

            const plaintext = await bytes.toString(CryptoJS.enc.Utf8);

            data.message = plaintext;
            return data;
          } else {
            return chat;
          }
        })
      );

      if (finalChatData) {
        const encryptedChat = { ...showChat1, messages: finalChatData };
        setShowChat(encryptedChat);
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (showChat1) {
      encryptMessageHandler();
    }
  }, [showChat1]);

  const getoffLineUserApi = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.offLineUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      getoffLineUserApi();
    };
  }, []);
  // const onlineUser = (id) => {
  //   if (id) {
  //     socket.on("connect", function () {
  //       socket.emit("onlineUser", { userId: id });
  //       socket.on("onlineUser", (event) => {
  //         setOnlineUsersList(event);
  //       });
  //     });
  //   } else {

  //   }
  // };

  // const _onhandleChange = (e) => {
  //   setSearchUserName({ ...data, [e.target.name]: e.target.value });
  //   setShowUser(false)
  // };

  const getUserDetails = async (id) => {
    try {
      const res = await axios.get(Apiconfigs.getOtheruserprofile + id);
      if (res.data.responseCode === 200) {
        setNewuserDetails(res.data.result);
      }
      setIsNewLoading(false);
    } catch (error) {
      setIsNewLoading(false);
    }
  };
  // const PerticularChat = () => {
  //   socket.emit("viewChat", { chatId: showChat1?._id });
  //   socket.on("viewChat", (message) => {
  //     setShowChat1(message.result);
  //   });
  // };
  const chatSend = async (chattext, isImage, event) => {
    if (event) {
      event.preventDefault();
    }
    setIsUploadingData(true);
    if ((!chattext && receiverId) || receiverId.length > 5) {
      const encryptedMessage = CryptoJS.AES.encrypt(
        chattext,
        user?.userData?._id
      );
      const chatdetails = {
        senderId: senderId,
        receiverId: receiverId,
        message: isImage ? chattext : encryptedMessage.toString(),
        mediaType: isImage ? "image" : "",
      };
      history.replace({
        pathname: "/chat-history",
        search: "",
      });
      axios({
        method: "POST",
        url: Apiconfigs.oneToOneChatApi,
        data: chatdetails,
        headers: {
          "content-type": "application/json",
        },
      })
        .then(async (response) => {
          if (response?.data?.response_code === 200) {
            setShowChat1();
            setNewuserDetails();
          } else {
            // PerticularChat();
          }
          setShowPicker(false);
          setInputStr("");
          setOpenSendImage(false);
        })
        .catch((error) => {
          toast.error("Sorry, No Receiver found");
        });

      // socket.emit("oneToOneChat", chatdetails);
      // if (newuserDetails) {
      //   setShowChat1();
      //   setNewuserDetails();
      // } else {
      //   PerticularChat();
      // }
      // setShowPicker(false);
      // setInputStr("");
      // setOpenSendImage(false);
    } else {
      toast.error("Sorry, No Receiver found");
    }
  };

  const readChatHandler = async (id, cancelTokenSource) => {
    try {
      const res = await axios.get(Apiconfigs.readChat + id, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
    } catch (error) { }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (!isEmpty(showChat1)) {
      if (
        showChat1 &&
        showChat1.receiverId._id &&
        showChat1.receiverId._id !== user.userData._id
      ) {
        setReceiverId(showChat1.receiverId._id);
      } else if (
        showChat1 &&
        showChat1.senderId._id &&
        showChat1.senderId._id !== user.userData._id
      ) {
        setReceiverId(showChat1.senderId._id);
      }

      if (showChat1 && showChat1._id && parseFloat(showChat1.unReadCount) > 0) {
      }
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [showChat1]);

  useEffect(() => {
    if (location.search) {
      const ids = location.search.split("?");
      if (ids[1]) {
        getUserDetails(ids[1]);
      } else {
        setIsNewLoading(false);
      }
    } else {
      setIsNewLoading(false);
    }
  }, [location]);

  const changeChat = (chat) => {
    setShowChat1(chat);

    if (!newuserDetails) {
      history.replace({
        pathname: "/chat-history",
        search: "",
      });
    }
  };

  useEffect(() => {
    if (showChat1?._id) {
      readChatHandler(showChat1._id);
    }
  }, [showChat1?._id]);

  const onEmojiClick = (event, emojiObject) => {
    setInputStr((data) => data + emojiObject.emoji);
  };

  const creatorListHandler = async (cancelTokenSource) => {
    try {
      const res = await axios.get(
        Apiconfigs.searchUserNameForsignUpTime,
        {
          cancelToken: cancelTokenSource && cancelTokenSource.token,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            search: searchUserName,
          },
        },
        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );
      if (res.data.responseCode === 200) {
        if (res.data.result.docs) {
          setSearchUserList(res.data.result.docs);
          console.log("Newdata find", res.data.result.docs);
        }
      } else {
        setSearchUserList([]);
      }
    } catch (error) {
      setSearchUserList([]);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (searchUserName.length > 0) {
      creatorListHandler(cancelTokenSource);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchUserName]);

  const disappearMessageHanlder = async () => {
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.disappearUpdate,
        data: {
          disappear: checked,
          time: 30,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
      }
    } catch (error) { }
  };
  useEffect(() => {
    if (typeof checked !== "undefined") {
      disappearMessageHanlder();
    }
  }, [checked]);

  const disappearViewHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.disappearView,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setChecked(res.data?.result?.disappear);
      }
    } catch (error) { }
  };

  useEffect(() => {
    disappearViewHandler();
  }, []);

  return (
    <>
      <Paper className={classes.root}>
        {isLoading ? (
          <DataLoading />
        ) : (
          <Grid container spacing={2} style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <Box className="searchBox">
                  {" "}
                  <div className={"searchField customSearch"}>
                    <Grid container spacing={2}>
                      <Grid item xs={9} sm={10}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          type="search"
                          onChange={(e) => {
                            setSearchUserName(e.target.value);
                            setShowUser(false);
                          }}
                          value={searchUserName}
                          InputProps={{
                            startAdornment: (
                              <FiSearch
                                position="start"
                                style={{ fontSize: "18px" }}
                              />
                            ),
                          }}
                        />

                        {searchUserList && searchUserList.length > 0 && (
                          <>
                            {!showUser && (
                              <SearchResults
                                searchResult={searchUserList}
                                setShowUser={setShowUser}
                                history={history}
                                setNewuserDetails={(details) =>
                                  setNewuserDetails(details)
                                }
                              />
                            )}
                          </>
                        )}
                      </Grid>
                      <Grid item xs={3} sm={2}>
                        <Box className={classes.outer}>
                          <Box className={classes.dot} />
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
                {/* USER LIST */}
                <Box className={classes.chatLeftBox}>
                  {showChatHistory &&
                    showChatHistory.map((chat, i) => {
                      console.log("chat------", chat);
                      return (
                        <>
                          {chat.receiverId &&
                            chat.receiverId._id !== senderId ? (
                            <Box
                              key={i}
                              className={classes.box}
                              style={
                                showChat1?._id == chat?._id
                                  ? { background: "#E31A89" }
                                  : {}
                              }
                              mb={2}
                              onClick={() => {
                                changeChat(chat);
                              }}
                            >
                              <Box className={classes.profilePic}>
                                <Box className="chatprofile">
                                  <img
                                    src={
                                      chat.receiverId &&
                                        chat.receiverId.profilePic
                                        ? chat.receiverId.profilePic
                                        : "images/Activity.png"
                                    }
                                    style={{ borderRadius: "50%" }}
                                  />
                                  <Hidden only={["md", "lg"]}>
                                    <Box>
                                      {chat.gray && (
                                        <Box
                                          className=" statusBox"
                                          // gray
                                          style={{ backgroundColor: "#7D807D" }}
                                        ></Box>
                                      )}
                                      {chat.receiverId.isOnline == true ? (
                                        <Box
                                          // active
                                          className=" statusBox"
                                        ></Box>
                                      ) : (
                                        <Box
                                          className=" statusBox"
                                          // orange
                                          style={{ backgroundColor: "#EB9310" }}
                                        ></Box>
                                      )}
                                      {chat.unReadCount > 0 && (
                                        <Box className=" chatBox">
                                          {" "}
                                          {chat.unReadCount}
                                        </Box>
                                      )}
                                    </Box>
                                  </Hidden>
                                </Box>
                                <Box className={classes.nameSection}>
                                  <Typography variant="h6">
                                    {" "}
                                    {chat?.receiverId?.userName
                                      ? chat?.receiverId?.userName
                                      : sortAddress(
                                        chat?.receiverId?.bnbAccount?.address
                                      )}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box align="right" className="activeBoxs">
                                <Typography
                                  variant="body1"
                                  component="span"
                                  style={{ color: "#BBB6B6" }}
                                >
                                  {/* {chat?.time} */}
                                </Typography>
                                {chat?.receiverId?.isOnline ? (
                                  <Box
                                    // active
                                    className=" statusBox"
                                  ></Box>
                                ) : (
                                  <Box
                                    className=" statusBox"
                                    // orange
                                    style={{ backgroundColor: "#EB9310" }}
                                  ></Box>
                                )}
                                {chat?.gray && (
                                  <Box
                                    className=" statusBox"
                                    // gray
                                    style={{ backgroundColor: "#7D807D" }}
                                  ></Box>
                                )}
                                {chat?.unReadCount > 0 && (
                                  <Box className=" chatBox">
                                    {" "}
                                    {chat?.unReadCount}
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              className={classes.box}
                              mb={2}
                              style={
                                showChat1?._id == chat?._id
                                  ? { background: "#E31A89" }
                                  : {}
                              }
                              onClick={() => {
                                changeChat(chat);
                              }}
                            >
                              <Box className={classes.chatimgBoxicon}>
                                <Box className="chatprofile">
                                  <img
                                    src={
                                      chat?.senderId && chat?.senderId?.profilePic
                                        ? chat?.senderId?.profilePic
                                        : "images/Activity.png"
                                    }
                                    style={{ borderRadius: "50%" }}
                                  />
                                  <Hidden only={["md", "lg"]}>
                                    <Box>
                                      {chat?.senderId?.isOnline ? (
                                        <Box
                                          // active
                                          className=" statusBox"
                                        ></Box>
                                      ) : (
                                        <Box
                                          className=" statusBox"
                                          // orange
                                          style={{ backgroundColor: "#EB9310" }}
                                        ></Box>
                                      )}

                                      {chat?.gray && (
                                        <Box
                                          className=" statusBox"
                                          // gray
                                          style={{ backgroundColor: "#7D807D" }}
                                        ></Box>
                                      )}
                                      {chat?.unReadCount > 0 && (
                                        <Box className=" chatBox">
                                          {" "}
                                          {chat?.unReadCount}
                                        </Box>
                                      )}
                                    </Box>
                                  </Hidden>
                                </Box>
                                <Box className={classes.nameSection}>
                                  <Typography variant="h6">
                                    {" "}
                                    {chat?.senderId?.userName
                                      ? chat?.senderId?.userName
                                      : sortAddress(
                                        chat?.senderId?.bnbAccount?.address
                                      )}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box align="right" className="activeBoxs">
                                <Typography
                                  variant="body1"
                                  component="span"
                                  style={{ color: "#BBB6B6" }}
                                ></Typography>

                                {chat?.senderId?.isOnline ? (
                                  <Box
                                    // active
                                    className=" statusBox"
                                  ></Box>
                                ) : (
                                  <Box
                                    // orange
                                    className=" statusBox"
                                    style={{ backgroundColor: "#EB9310" }}
                                  ></Box>
                                )}

                                {chat?.gray && (
                                  <Box
                                    // gray
                                    className=" statusBox"
                                    style={{ backgroundColor: "#7D807D" }}
                                  ></Box>
                                )}
                                {chat?.unReadCount > 0 && (
                                  <Box className=" chatBox">
                                    {" "}
                                    {chat?.unReadCount}
                                  </Box>
                                )}
                                <Typography variant="h6">
                                  {" "}
                                  {/* {chat?.senderId?.userName
                                    ? chat?.senderId?.userName
                                    : sortAddress(
                                        chat?.senderId?.bnbAccount?.address
                                      )} */}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </>
                      );
                    })}
                </Box>
              </Paper>
            </Grid>
            {/* RIGHT CHAT BAR */}
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Paper className={classes.paper}>
                <Box style={{ borderBottom: "1px solid #242526" }}>
                  <Grid container spacing={2} style={{ alignItems: "center" }}>
                    <Grid item lg={6} sm={6} md={6} xs={6} align="left">
                      {showChat1?.receiverId?._id !== senderId ? (
                        <Box className="headerbox">
                          <img
                            src={
                              showChat1?.receiverId?.profilePic
                                ? showChat1?.receiverId?.profilePic
                                : "images/Activity.png"
                            }
                          />
                          <Box ml={2}>
                            <Typography variant="h6">
                              {" "}
                              {showChat1?.receiverId?.userName
                                ? showChat1?.receiverId?.userName
                                : sortAddress(
                                  showChat1?.receiverId?.bnbAccount?.address
                                )}
                            </Typography>
                            {showChat1?.receiverId?.isOnline == true ? (
                              <Box style={{ display: "flex" }}>
                                <Typography>Active Now</Typography>
                                <Box className={classes.dot} ml={1} mt={0.3} />
                              </Box>
                            ) : (
                              <Box style={{ display: "flex" }}>
                                <Typography>Offline</Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      ) : (
                        <Box className="headerbox">
                          <img
                            src={
                              showChat1?.senderId?.profilePic
                                ? showChat1?.senderId?.profilePic
                                : "images/Activity.png"
                            }
                          />
                          <Box ml={2}>
                            <Typography variant="h6">
                              {showChat1?.senderId?.userName
                                ? showChat1?.senderId?.userName
                                : sortAddress(
                                  showChat1?.senderId?.bnbAccount?.address
                                )}
                            </Typography>
                            {showChat1?.senderId?.isOnline == true ? (
                              <Box style={{ display: "flex" }}>
                                <Typography>Active Now</Typography>
                                <Box className={classes.dot} ml={1} mt={0.3} />
                              </Box>
                            ) : (
                              <Box style={{ display: "flex" }}>
                                <Typography>Offline</Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    {/* <Grid item lg={6} sm={6} md={6} xs={6} align="right">
                      <Box style={{ padding: "20px" }}>
                        <Typography title="Is Disappear">
                          <Switch
                            checked={checked}
                            onChange={(event) => {
                              setChecked(event.target.checked);
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Typography>
                      </Box>
                    </Grid> */}
                  </Grid>
                </Box>

                <Box className="bodyBox">
                  <Box textAlign="center" mt={2} mb={2}>
                    {/* <Typography> {moment().format("MMMM DD, YYYY")}</Typography> */}
                  </Box>

                  <>
                    {showChat?.messages?.map((chat, i) => {
                      return (
                        <>
                          {chat && (
                            <>
                              {chat?.receiverId === senderId ? (
                                <Box className={classes.box1} key={i}>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="flex-end"
                                  >
                                    <Grid item lg={1} sm={1} md={1} xs={2}>
                                      <img
                                        src={
                                          showChat?.receiverId?.profilePic
                                            ? showChat?.receiverId?.profilePic
                                            : "images/Activity.png"
                                        }
                                      />
                                    </Grid>
                                    <Grid item lg={8} sm={9} md={8} xs={8}>
                                      <Box
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <Box className={classes.mess1}>
                                          {chat?.mediaType === "image" ? (
                                            <Box>
                                              <img
                                                src={chat.message}
                                                style={{

                                                  width: 100,
                                                  borderRadius: "unset",
                                                  objectFit: "cover"
                                                }}
                                              />
                                            </Box>
                                          ) : (
                                            <Typography
                                              variant="body1"
                                              style={{ wordBreak: "break-all" }}
                                            >
                                              {chat?.message}
                                            </Typography>
                                          )}
                                          <Typography
                                            variant="body1"
                                            component="small"
                                          >
                                            {moment(chat?.createdAt)
                                              .local()
                                              .fromNow()}
                                          </Typography>
                                          <IconButton
                                            onClick={(event) => {
                                              setAnchorEl(event?.currentTarget);
                                              setSelectedChat(chat);
                                            }}
                                            aria-controls="customized-menu"
                                            aria-haspopup="true"
                                            className={classes.menuShare}
                                          >
                                            <FaEllipsisH />
                                          </IconButton>
                                          {anchorEl && selectedChat && (
                                            <StyledMenuBox
                                              anchorEl={anchorEl}
                                              setAnchorEl={(data) =>
                                                setAnchorEl(data)
                                              }
                                              chat={selectedChat}
                                              setOpen={(data) => setOpen(data)}
                                              setOpenShare={(data) =>
                                                setOpenShare(data)
                                              }
                                            />
                                          )}
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ) : (
                                <Box className={classes.box1} key={i}>
                                  <Grid
                                    container
                                    spacing={2}
                                    alignItems="flex-end"
                                  >
                                    <Grid
                                      item
                                      lg={3}
                                      sm={2}
                                      md={3}
                                      xs={2}
                                    ></Grid>
                                    <Grid item lg={8} sm={9} md={8} xs={8}>
                                      <Box
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <Box className={classes.mess}>
                                          {chat.mediaType === "image" ? (
                                            <Box>
                                              <img
                                                src={chat?.message}
                                                style={{

                                                  width: 100,
                                                  borderRadius: "unset",
                                                  objectFit: "cover"
                                                }}
                                              />
                                            </Box>
                                          ) : (
                                            <Typography
                                              variant="body1"
                                              style={{ wordBreak: "break-all" }}
                                            >
                                              {chat?.message}
                                            </Typography>
                                          )}
                                          <Typography
                                            variant="body1"
                                            component="small"
                                          >
                                            {moment(chat?.createdAt)
                                              .local()
                                              .fromNow()}
                                          </Typography>
                                          <IconButton
                                            onClick={(event) => {
                                              setAnchorEl(event?.currentTarget);
                                              setSelectedChat(chat);
                                            }}
                                            aria-controls="customized-menu"
                                            aria-haspopup="true"
                                            className={classes.menuShare}
                                          >
                                            <FaEllipsisH />
                                          </IconButton>
                                          {anchorEl && selectedChat && (
                                            <StyledMenuBox
                                              anchorEl={anchorEl}
                                              setAnchorEl={(data) =>
                                                setAnchorEl(data)
                                              }
                                              chat={selectedChat}
                                              setOpen={(data) => setOpen(data)}
                                              setOpenShare={(data) =>
                                                setOpenShare(data)
                                              }
                                            />
                                          )}
                                        </Box>
                                      </Box>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={1}
                                      sm={1}
                                      md={1}
                                      xs={2}
                                      align="right"
                                    >
                                      <img
                                        src={
                                          showChat?.senderId?.profilePic
                                            ? showChat?.senderId?.profilePic
                                            : "images/Activity.png"
                                        }
                                      />
                                    </Grid>
                                  </Grid>
                                </Box>
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                  </>
                </Box>
                <form
                  onSubmit={(event) => {
                    if (image) {
                      chatSend(image, true, event);

                      setTimeout(() => {
                        setimage();
                      }, 100);
                    } else {
                      chatSend(inputStr, false, event);
                    }
                  }}
                >
                  <Box className="footerBox">
                    <Grid
                      container
                      spacing={2}
                      style={{ alignItems: "center" }}
                    >
                      {showPicker && (
                        <Box className={classes.emojiBox}>
                          <Picker onEmojiClick={onEmojiClick} />
                        </Box>
                      )}
                      <Grid item xs={9} sm={11}>
                        <Box>
                          <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="Type something here...."
                            onChange={(e) => setInputStr(e.target.value)}
                            value={inputStr}
                            // disabled={image ? true : false}
                            InputProps={{
                              endAdornment: (
                                <Box
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box className="linkBox">
                                    {" "}
                                    <HiLink style={{ fontSize: "20px" }} />{" "}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        getBase64(
                                          e.target.files[0],
                                          (result) => {
                                            setimage(result);
                                            setOpenSendImage(true);
                                          }
                                        );
                                      }}
                                    />
                                  </Box>
                                  <BsEmojiLaughing
                                    position="end"
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setShowPicker((val) => !val)}
                                  />
                                </Box>
                              ),
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={1}>
                        <Button
                          type="submit"
                          disabled={!inputStr}
                        // onClick={() => {
                        //   if (image) {
                        //     chatSend(image, true);

                        //     setTimeout(() => {
                        //       setimage();
                        //     }, 100);
                        //   } else {
                        //     chatSend(inputStr, false);
                        //   }
                        // }}
                        >
                          <AiOutlineSend />
                          {isUploadingData && <ButtonCircularProgress />}
                        </Button>
                      </Grid>
                    </Grid>{" "}
                  </Box>
                </form>
              </Paper>
            </Grid>
          </Grid>
        )}
        {/* Send Image */}
        <Dialog aria-labelledby="customized-dialog-title" open={openSendImage}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => setOpenSendImage(false)}
          >
            Send Image
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {image ? (
                <Box className="right-Box">
                  <Box>
                    <img src={image} width="100%" />
                  </Box>
                </Box>
              ) : (
                ""
              )}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setOpenSendImage(false);
                setimage("");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              autoFocus
              onClick={(event) => {
                if (image) {
                  chatSend(image, true, event);

                  setTimeout(() => {
                    setimage();
                  }, 100);
                }
              }}
              color="primary"
            >
              Send{image ? " it" : ""}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openShare}
          onClose={() => setOpenShare(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Share Post"}</DialogTitle>
          <DialogContent>
            <IconButton
              className={classes.cancelBtn}
              onClick={() => setOpenShare(false)}
            >
              <MdCancel />
            </IconButton>
            <SocialShareBox url={websiteName} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={open}
          onClose={() => {
            setAnchorEl(null);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Block this user"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              Are you sure you want to <br /> Block this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              color="primary"
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
}

export default ChatList;

export function StyledMenuBox({
  anchorEl,
  setAnchorEl,
  chat,
  setOpen,
  setOpenShare,
}) {
  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => {
        setAnchorEl(null);
      }}
    >
      {chat.mediaType === "text" && (
        <StyledMenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          <CopyToClipboard text={chat?.message}>
            <ListItemText
              primary="Copy"
              onClick={() => toast.success("Copied")}
            />
          </CopyToClipboard>
        </StyledMenuItem>
      )}
    </StyledMenu>
  );
}

export function SearchResults({ searchResult, history, setShowUser }) {
  return (
    <ul className="list-group text-dark" id="search-list">
      {searchResult?.length > 0 && (
        <>
          {searchResult?.map((data, i) => {
            console.log("data--nwe-chat", data);
            return (
              <li
                key={i}
                className="list-group-item"
                style={{ textAlign: "left", zIndex: 999 }}
                onClick={() => {
                  history.push({
                    pathname: "/chat-history",
                    search: data._id,
                  });
                  setShowUser(true);
                }}
              >
                <Box display={"flex"} justifyContent="space-between">
                  <Box display={"flex"}>
                    <img
                      src={
                        data.profilePic
                          ? data.profilePic
                          : "images/Activity.png"
                      }
                      alt=""
                    />
                    <Typography>
                      {" "}
                      {data.userName ? data.userName : data.name}
                    </Typography>
                  </Box>
                </Box>
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
}
