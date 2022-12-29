import React, { useEffect, useState, useContext } from "react";
import {
  makeStyles,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Hidden,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  Select,
  TextField,
  FormHelperText,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import Following from "./Following";
import { BsClockHistory } from "react-icons/bs";
import DialogActions from "@material-ui/core/DialogActions";
import { GiCancel } from "react-icons/gi";
import { useHistory, useLocation } from "react-router-dom";
import { FaCopy, FaUserEdit, FaUserCheck } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import Bundles from "./Bundles";
import { AuthContext } from "src/context/Auth";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { BiCopy } from "react-icons/bi";
import axios from "axios";
import { sortAddress, getWeb3Obj } from "src/utils";
import ApiConfig from "src/ApiConfig/ApiConfig";
import Follower from "./Follower";
import NoDataFound from "src/component/NoDataFound";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .imgbox": {
      position: "relative",
      "& .editicon1": {
        position: "absolute",
        bottom: "10px",
        right: "10px",
        backgroundColor: "#FFF",
        [theme.breakpoints.down("xs")]: {
          width: "30px",
          height: "30px",
        },
      },
      "& .postImg": {
        height: "260px",
        overflow: "hidden",
        position: "relative",
        margin: "0",
        backgroundSize: "100% !important",
        backgroundRepeat: "no-repeat !important",
        backgroundPosition: "center !important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px 10px 0px 0px",
        // [theme.breakpoints.down("md")]: {
        //   borderRadius: "10px 10px 0px 0px",
        // },
        "& img": {
          top: "50%",
          left: "50%",
          width: "auto",
          height: "auto",
          position: "absolute",
          minWidth: "100%",
          transform: "translate(-50%, -50%)",
          minHeight: "100%",
          "@media(max-width:767px)": {
            height: "130px",
          },
        },
      },
    },
    "& .userProfile": {
      position: "relative",
      alignItems: "center",
      justifyContent: "left",
      marginTop: "-75px",
      padding: "0 20px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "-150px",
      },
      "& .editprofile": {
        position: "absolute",
        bottom: "0px",
        right: "0px",
      },
      "& figure": {
        width: "175px",
        maxWidth: "130px",
        height: "130px",
        borderRadius: "50%",
        margin: "0 auto",
        marginTop: "-40px",
        position: "relative",
        background:
          "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
        backdropFilter: " blur(42px)",
        border: "3px solid #161616",
        // background: "rgb(42 123 135)",
        // borderRadius: "50%",
        // border: "2px solid #f1f1f1",
        // maxWidth: "150px",
        // width: "100%",
        // height: "100%",
        // position: "relative",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "space-between",
        // margin: "0 auto 13px",
        "@media(max-width:767px)": {
          maxWidth: "75px",
          height: "75px",
          marginTop: "-10px",
        },
      },

      "& h3": {
        marginLeft: "10px",
        marginTop: "-20px",
      },
      "& .user": {
        // position: "absolute",
        // marginLeft: "15px",
        "& .editprofileicon": {
          background: "#FFF !important",
          position: "absolute",
          right: "0px",
          bottom: "-60px",
          left: "100px",
          background: "#fff",
          "@media(max-width:767px)": {
            width: "20px",
            height: "20px",
            top: "-50px",
            left: "80px",
          },
        },
        "& img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        },
      },
    },
    "& .pricetext": {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      paddingRight: "16px",
      [theme.breakpoints.down("xs")]: {
        paddingRight: "10px",
      },
    },
    "& .username": {
      marginLeft: "25px",
      marginTop: "12px",
      "@media(max-width:767px)": {
        marginTop: "45px",
      },
      "& p": {
        padding: "5px 0px",
        "@media(max-width:767px)": {
          fontSize: "10px !important",
        },
      },
    },
    "& .buttonbox": {
      "& Button": {
        margin: "0px 15px",
      },
    },
    "& .outerbox": {
      padding: "15px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px",
      },
      "& .detail": {
        padding: "15px",
        borderRadius: "15px",
        backgroundColor: "#101010",
        "@media(max-width:600px)": {
          padding: "10px",
        },
      },
    },
  },
  withdraw: {
    "& .numbertext": {
      "& .selectimg": {
        width: "100px",
        display: "flex",
        alignItems: "center",
      },
      "& .dialogImg": {
        width: "100%",
        maxWidth: "20px",
        height: "100%",
        maxHeight: "20px",
        margin: "16px 5px",
        borderRadius: "50%",
        overflow: "hidden",
        "& img": {
          maxWidth: "20px",
          maxHeight: "20px",
        },
      },
    },
    "& .basetext": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& p": {
        marginRight: "5px",
      },
    },
  },
  iconbox: {
    position: "absolute",
    top: "0",
    right: "15px",
    "@media(max-width:767px)": {
      left: "75px",
    },
    "& .editprofileicon": {
      "@media(max-width:767px)": {
        width: "25px",
        height: "25px",
        bottom: "-15px",
      },
    },
  },
  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  text1: {
    marginLeft: "16px",
    "@media(max-width:375px)": {
      marginTop: "5px",
      marginLeft: "0px",
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgb(232, 170, 62)",
    },
  },
  btnhead: {
    display: "flex",
    marginTop: "-170px",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
  },
  btnfollow2: {
    background: "#242526",
    border: "1px solid #242526",
    marginRight: "9px",
    borderRadius: "9px",
    cursor: "pointer",
    backdropFilter: "blur(24px)",
    "&:hover": {
      color: "#EC167F;",
    },
    [theme.breakpoints.down("sm")]: {
      background: "#242526",
    },
    "@media(max-width:767px)": {
      padding: "0px",
    },
    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      textAlign: "center",
      color: "#FFFFFF",
      "@media(max-width:818px)": {
        fontSize: "18px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#FFFFFF",
      textAlign: "center",
      "@media(max-width:818px)": {
        fontSize: "12px",
      },
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-3px",
    right: "0",
    color: "#fff",
  },
  profileDetails: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginTop: "-20px",
    "@media(max-width:767px)": {
      marginTop: "-55px",
    },
  },
  buttonbox: {
    margin: "20px 20px 0px 0px",
    "@media(max-width:767px)": {
      marginTop: "50px",
    },
  },
  addphotos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    // border: "1px solid #FFF",
    // position: "relative",
    "& .imagebox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5px",
      // padding: "15px",
    },
    "& .text": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& .address": {
        display: "flex",
        alignItems: "center",
      },
      "& p": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "200px",
      },
    },
  },
}));

function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [openBuy, setOpenBuy] = useState(false);
  const [tabview, setTabView] = useState("all");
  const [openPlaceBid, setOpenPlaceBid] = useState(false);
  const [deposit, setDeposit] = React.useState(false);
  const [withdraw, setWithdraw] = React.useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [num, setNum] = React.useState(" ");
  const [userData1, setUserData1] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [followerListCount, setFollowerListCount] = useState();
  const [followingList, setFollowingList] = useState([]);
  const [followingListCount, setFollowingListCount] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [textError, setTextZeroError] = useState("");
  const [walletAddressWallet, setWalletAddressWallet] = useState("");
  const [getTokenDetails, setErrorValidTokenAddress] = useState(false);
  const [userReferralData, setUserReferralData] = useState({});

  const userDashboardHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.userDashboard,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setUserReferralData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userDashboardHandler();
  }, []);

  const handleClose = () => {
    setOpenBuy(false);
  };
  const handleOpenDeposit = () => {
    setDeposit(true);
    // getDepositApi();
  };

  const listfollowerHandler = async () => {
    try {
      // FollowerList([]);
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.listFollowerUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        listfollowingHandler();
        setFollowerList(res.data.result.followers);
        setFollowerListCount(res.data.result.count);
        setIsLoading(false);
      }
    } catch (error) {
      setFollowerList([]);
      setIsLoading(false);
    }
  };
  const listfollowingHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: ApiConfig.listFollowingUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        // listfollowerHandler();
        setFollowingList(res.data.result.following);
        setFollowingListCount(res.data.result.count);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setFollowingList([]);
    }
  };
  useEffect(() => {
    listfollowerHandler();
    listfollowingHandler();
  }, []);
  useEffect(() => {
    setUserData1(auth.userData);
  }, [auth.userData]);

  const getTokenAddressDetails = async () => {
    try {
      const web3 = await getWeb3Obj();
      const dataRes = web3.utils.isAddress(walletAddressWallet);
      console.log("datares", dataRes);
      if (dataRes) {
        setErrorValidTokenAddress(true);
      } else {
        setErrorValidTokenAddress(false);
      }
    } catch (error) {
      console.log("error", error);
      setErrorValidTokenAddress(false);
      toast.error("Please enter valid token address");
    }
  };
  useEffect(() => {
    if (walletAddressWallet && walletAddressWallet !== "") {
      getTokenAddressDetails();
    } else {
    }
  }, [walletAddressWallet]);

  const withdrawHandler = async () => {
    if (parseInt(userData1?.bnbBalace) > 0) {
      setIsSubmit(true);
      if (
        walletAddressWallet &&
        Number(withdrawAmount) > 101 &&
        getTokenDetails &&
        remainingBalance > 0
      ) {
        setIsLoading(true);

        try {
          const res = await axios({
            method: "POST",
            url: ApiConfig.withdraw,
            headers: {
              token: window.localStorage.getItem("token"),
            },
            data: {
              walletAddress: walletAddressWallet,
              amount: withdrawAmount,
            },
          });
          if (res.data.responseCode === 200) {
            setWithdraw(false);
            toast.success(res.data.responseMessage);
            auth.handleUserProfileApi();
          }
          setIsLoading(false);
        } catch (error) {
          toast.error(error?.response?.data?.responseMessage);
          setIsLoading(false);
          //   setAnchorEl(false);
        }
      }
    } else {
      toast.info("Insufficient Funds");
    }
  };

  console.log("userData1---", userData1);

  const remainingBalance = parseInt(userData1?.bnbBalace) - withdrawAmount;

  return (
    <>
      <Paper className={classes.root}>
        <Box className="imgbox">
          <figure className="postImg">
            <img
              src={
                userData1 && userData1.coverPic
                  ? userData1.coverPic
                  : "images/userback.png"
              }
              alt="error"
            />
          </figure>
        </Box>

        <Box className={classes.headbox2}>
          <Box style={{ display: "flex", flexWrap: "wrap" }}></Box>
        </Box>
        <Box className={classes.profileDetails}>
          <Box className="userProfile">
            <figure className="user">
              <img
                src={
                  userData1 && userData1.profilePic
                    ? userData1.profilePic
                    : "/images/user.png"
                }
                alt="error"
              />
            </figure>
            <Box className={classes.iconbox}>
              <IconButton
                className="editprofileicon"
                style={{ background: "#fff" }}
                onClick={() =>
                  history.push({
                    pathname: "/settings",
                    search: userData1?._id,
                    hash: "editProfile",
                    state: {
                      data: userData1,
                    },
                  })
                }
              >
                <GrEdit />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={1}>
            {auth?.userData?.userType !== "Admin" && (
              <Grid item xs={12} sm={12} md={12} align="right">
                <Box className={classes.buttonbox}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenDeposit}
                    style={{ marginRight: "5px", marginBottom: "8px" }}
                  >
                    Deposit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setWithdraw(true)}
                    style={{ marginLeft: "5px", marginBottom: "8px" }}
                  >
                    Withdraw
                  </Button>
                </Box>
              </Grid>

            )}

            <Grid item xs={12} sm={5} md={4}>
              <Box className="username">
                <Typography color="primary.main" variant="h3">
                  {userData1?.name ? userData1?.name : userData1?.userName}
                </Typography>
                {userData1?.walletAddress && (
                  <Typography variant="body1">
                    {userData1?.walletAddress}
                    <CopyToClipboard text={userData1?.walletAddress}>
                      <BiCopy
                        style={{
                          color: "#fff",
                          fontSize: " 14px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.info("Copied successfully")}
                      />
                    </CopyToClipboard>
                  </Typography>
                )}
                {auth?.userData?.userType !== "Admin" && (
                  <Typography variant="body1">
                    Total Subscriber : &nbsp; {userData1?.subscriberCount}
                  </Typography>
                )}


                <Typography variant="body1">
                  Your Share Balance : &nbsp;{" "}
                  {userData1?.bnbBalace > 0
                    ? parseInt(userData1?.bnbBalace)
                    : 0}
                  &nbsp;Share
                </Typography>
                {auth?.userData?.userType !== "Admin" && (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className={classes.btnfollow2}
                      onClick={() => setOpenBuy(true)}
                    >
                      <Typography
                        color="primary.main"
                        variant="body1"

                      >
                        <b>{followerListCount}</b> Followers
                      </Typography>
                    </Box>
                    <Box
                      className={classes.btnfollow2}
                      onClick={() => setOpenPlaceBid(true)}
                    >
                      <Typography
                        color="primary.main"
                        variant="body1"

                      >
                        <b>{followingListCount}</b> Following
                      </Typography>
                    </Box>
                  </Box>
                )}



              </Box>
            </Grid>
            {auth?.userData?.userType !== "Admin" && (
              <>
                <Grid item xs={12} sm={5} md={4}>
                  <Box className="username">
                    <Typography color="primary.main" variant="h3">
                      Referral Details
                    </Typography>

                    <Typography variant="body1">
                      Sign Up Bonus : &nbsp;{" "}
                      {userReferralData?.tatalSignupBonus
                        ? userReferralData?.tatalSignupBonus
                        : "0 "} Share
                    </Typography>

                    <Typography variant="body1">
                      Referral Earning : &nbsp;{" "}
                      {userReferralData?.totalrefferralBonus
                        ? userReferralData?.totalrefferralBonus
                        : "0"} Share
                    </Typography>

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <Box className={classes.btnfollow2}>
                        <Typography
                          color="primary.main"
                          variant="body1"

                        >
                          Total Refferral :{" "}
                          {userReferralData?.totalReferralUser
                            ? userReferralData?.totalReferralUser
                            : "0"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                  <Box className="username">
                    <Typography
                      color="primary.main"
                      variant="h3"
                      style={{ fontSize: "14px" }}
                    >
                      My refferal link :
                    </Typography>

                    <Box mr={1} mt={2} mb={1}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        value={
                          window.location.origin +
                          `${"/"}`?.concat(userData1?.referralCode)
                        }
                        InputProps={{
                          className: classes.TextBox,
                          endAdornment: (
                            <InputAdornment position="end">
                              <CopyToClipboard
                                text={
                                  `${window.location.origin}/signup?${userData1?.referralCode}`

                                }
                              >
                                <Button
                                  onClick={() => toast.info("Copied")}
                                  style={{ color: "#E31A89CC", fontSize: "14px" }}
                                >
                                  COPY
                                </Button>
                              </CopyToClipboard>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    {userData1?.referralCode && (
                      <Typography variant="body1">
                        Referral code &nbsp; {userData1?.referralCode}{" "}
                        <CopyToClipboard text={userData1?.referralCode}>
                          <BiCopy
                            style={{
                              color: "#fff",
                              fontSize: " 14px",
                              cursor: "pointer",
                              marginLeft: "5px",
                            }}
                            onClick={() => toast.info("Copied successfully")}
                          />
                        </CopyToClipboard>
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </>
            )}

          </Grid>
        </Box>

        {userData1?.userType === "User" ? (
          <Box className="outerbox">
            <Box className="detail">
              <Bundles />
            </Box>
          </Box>
        ) : (
          ""
        )}

        <Box>
          {openPlaceBid && (
            <Dialog
              open={openPlaceBid}
              onClose={() => setOpenPlaceBid(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={() => setOpenPlaceBid(false)}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={2}>
                  <Typography
                    variant="h5"
                    style={{
                      borderBottom: "1px solid gray",
                      padding: "8px",
                    }}
                  >
                    Following
                  </Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  {followingList && followingList.length > 0 ? (
                    <Grid container>
                      {followingList &&
                        followingList?.map((data, i) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              key={i}
                              className="walletSet "
                            >
                              <Following
                                listfollowingHandler={listfollowingHandler}
                                data={data}
                                type="timing"
                                index={i}
                              />
                            </Grid>
                          );
                        })}
                    </Grid>
                  ) : (
                    <NoDataFound />
                  )}
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>

        <Box>
          {openBuy && (
            <Dialog
              open={openBuy}
              onClose={() => setOpenBuy(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.paper }}
              maxWidth="xs"
            >
              <DialogActions>
                <IconButton
                  onClick={handleClose}
                  className={classes.customizedButton}
                >
                  <GiCancel />
                </IconButton>
              </DialogActions>
              <DialogContent className={classes.padding0}>
                <Box align="center" mb={2}>
                  <Typography
                    variant="h4"
                    style={{
                      borderBottom: "1px solid gray",
                      padding: "8px",
                    }}
                  >
                    Followers
                  </Typography>
                </Box>
                <Box className={classes.FollowingBox}>
                  {followerList && followerList.length > 0 ? (
                    <Grid container>
                      {followerList &&
                        followerList?.map((data, i) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              key={i}
                              className="walletSet "
                            >
                              <Follower
                                listfollowerHandler={listfollowerHandler}
                                data={data}
                                type="timing"
                                index={i}
                              />
                            </Grid>
                          );
                        })}
                    </Grid>
                  ) : (
                    <NoDataFound />
                  )}
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </Box>
        {/* Diposit Dialouge Box */}
        <Dialog
          open={deposit}
          onClose={() => {
            setDeposit(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" align="center">
            {/* {"Deposit"} */}
            <Typography variant="h6" style={{ paddingTop: "8px" }}>
              Deposit
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box>
              <Box className={classes.addphotos}>
                <Box className="imagebox">
                  <img src="images/wallet.png" alt="wallet Image" />
                </Box>
                <Box className="text">
                  <Typography variant="body2">My Wallet Address</Typography>
                  &nbsp;
                  {userData1?.bnbAccount?.address && (
                    <img
                      width="56%"
                      src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${userData1?.bnbAccount?.address}&choe=UTF-8`}
                      alt=""
                    />
                  )}
                  &nbsp;
                  <Box className="address">
                    <Typography variant="body2">
                      {sortAddress(userData1?.bnbAccount?.address)}
                      {/* {userData1?.bnbAccount?.address} */}
                      <CopyToClipboard text={userData1?.bnbAccount?.address}>
                        <BiCopy
                          style={{
                            color: "#fff",
                            fontSize: " 14px",
                            cursor: "pointer",
                            marginLeft: "5px",
                          }}
                          onClick={() => toast.info("Copied successfully")}
                        />
                      </CopyToClipboard>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mb={2} mt={1} align="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setDeposit(false)}
                style={{ marginLeft: "10px" }}
              >
                Close
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
        {/* withdraw dialog box */}
        <Dialog
          open={withdraw}
          onClose={() => {
            setWithdraw(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" align="center">
            {"Withdraw"}
          </DialogTitle>
          <DialogContent align="center">
            <Box className={classes.withdraw}>
              <Grid container direction={"column"} spacing={3}>
                <Grid item xs={12}>
                  <Box>
                    <Typography
                      variant="body2"
                      style={{ color: "#FFFFFF", fontWeight: "bold" }}
                    >
                      Choose amount to withdraw
                    </Typography>
                  </Box>
                </Grid>
                {/* {withdrawAmount && withdrawAmount > 0 && ( */}
                <Box align="right" mr={2}>
                  Remaining Balance &nbsp;{remainingBalance}
                </Box>
                {/* )} */}
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    disabled={isLoading}
                    placeholder={
                      userData1?.bnbBalace ? parseInt(userData1?.bnbBalace) : 0
                    }
                    type="number"
                    fullWidth
                    value={withdrawAmount}
                    error={Boolean(
                      (isSubmit && withdrawAmount === "") ||
                      (withdrawAmount !== "" && Number(withdrawAmount) === 0)
                    )}
                    onChange={(e) => {
                      if (userData1?.bnbBalace > 0) {
                        if (remainingBalance > 0) {
                          setWithdrawAmount(e.target.value);
                        } else {
                          setWithdrawAmount(e.target.value);
                          const timer = setTimeout(() => {
                            setTextZeroError("");
                          }, 5000);
                          setTextZeroError(
                            "Your remaining balance is less than 0"
                          );
                        }
                      } else {
                        const timer = setTimeout(() => {
                          setTextZeroError("");
                        }, 5000);
                        setTextZeroError("Your wallet balance is 0");
                      }
                    }}
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                  />
                  {textError && (
                    <FormHelperText error>
                      <Box ml={1}>{textError}</Box>
                    </FormHelperText>
                  )}

                  <FormHelperText error>
                    {
                      (isSubmit && withdrawAmount === "" && (
                        <Box ml={1}>Enter a valid withdraw amount</Box>
                      )) ||
                      (withdrawAmount !== "" &&
                        Number(withdrawAmount) <= 101 && (
                          <Box ml={1}>
                            Withdraw amount should be greator than 101
                          </Box>
                        ))
                      //   ||
                      // (withdrawAmount !== "" &&
                      //   Number(withdrawAmount)< && (
                      //     <Box ml={1}>Enter a valid withdraw amount</Box>
                      //   ))
                    }
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    disabled={isLoading}
                    placeholder="Wallet Address"
                    type="text"
                    value={walletAddressWallet}
                    onChange={(e) => setWalletAddressWallet(e.target.value)}
                    fullWidth
                    error={
                      Boolean(isSubmit && !walletAddressWallet) ||
                      (walletAddressWallet !== "" && !getTokenDetails)
                    }

                  // onClick={handleClickOpen}
                  />
                  <FormHelperText error>
                    {(isSubmit && !walletAddressWallet && (
                      <Box ml={1}>Wallet address is required</Box>
                    )) ||
                      (walletAddressWallet !== "" && !getTokenDetails && (
                        <Box ml={1}>Please enter valid address</Box>
                      ))}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <Box align="center" mt={2} mb={2}>
                    <Button
                      disabled={!withdrawAmount || isLoading}
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={withdrawHandler}
                    >
                      Withdraw {isLoading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              {/* <Box className="basetext">
                <Typography variant="body2" color="secondary.main">
                  Fees
                </Typography>
                <Link
                  onClick={() => {
                    setDeposit(false);
                  }}
                >
                  Apply
                </Link>
              </Box> */}
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}
export default Profile;
