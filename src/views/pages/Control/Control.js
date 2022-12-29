import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  FormHelperText,
  FormControl,
  OutlinedInput,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory, Redirect } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { MdOutlineFileCopy } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import { AuthContext } from "src/context/Auth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { tokenName } from "src/utils";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  adminBox: {
    backgroundColor: "#242526",
    padding: "20px",
    borderRadius: "14px",
  },
  root: {
    padding: "40px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 0",
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
      color: "#e6e5e8",
    },
  },
  gridSection: {
    "& label": {
      color: theme.palette.secondary.white,
      fontSize: "14px",
      margin: "6px 0",
      "& span": {
        display: "inline-block",
        marginTop: "-9px",
      },
      "& .MuiFormGroup-root": {
        flexDirection: "revert",
        marginLeft: 13,
        "& .MuiSvgIcon-root": {
          width: "13px",
          height: "13px",
        },
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.secondary.white,
    },
  },
  btnbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  colorbox: {
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
  cell: {
    fontSize: "14px",
  },
  main: {
    backgroundColor: "#242526",
    padding: "15px",
    borderRadius: "10px",
    "& .content": {
      backgroundColor: "#101010",
      // width: "100%",
      padding: "15px",
      "& .heading": {
        paddingBottom: "15px",
      },
    },
  },
  nodatafound: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Controls() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [collectionId, setCollection] = useState();
  const [auctionId, setAuction] = useState();
  const [subscriptionId, setSubscription] = useState();
  const [postId, setPostId] = useState();
  const [collectionFee, setCollectionFee] = useState("");
  const [auctionFee, setAuctionFee] = useState("");
  const [subscriptionFee, setSubscriptionFee] = useState("");
  const [postFee, setPostFee] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitAuction, setIsSubmitAuction] = useState(false);
  const [isSubmitSubscription, setIsSubmitSubscription] = useState(false);
  const [isSubmitPost, setIsSubmitPost] = useState(false);
  const [subAdminList, setSubAdmin] = useState([]);
  const [isSubAdminLoading, setIsSubAdminLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [userData1, setUserData1] = useState();
  const [adminId, setAdminId] = useState();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isOpenInterest, setIsopenInterest] = useState(false);
  const [durationList, setSurationList] = useState([]);
  const [durationDay, setDurationDay] = useState("");
  const [amountTime, setAmount] = useState("");
  const [openDuration, setOpenDuration] = useState(false);
  const [userDuration, setUserDuration] = useState();
  const [interestList, setListIntrest] = useState();
  const [openInterestAdmin, setIsopenInterestAdmin] = useState(false);
  const [interestName, setIsinterseName] = useState();
  const [isSubAdminIntersetLoading, setIsadminLoading] = useState(true);
  const [userInterest, setUserIntereset] = useState();
  const [isOpenInterestDelete, setIsopenInterestDelete] = useState(false);
  const [pageDuration, setPageDuration] = useState(1);
  const [noOfPagesDuration, setNoOfPagesDuration] = useState(1);
  const [pageInterest, setPageInterest] = useState(1);
  const [noOfPagesInterest, setNoOfPagesInterest] = useState(1);
  const [isSubmitInterest, setIsSubmitInterest] = useState(false);
  const [signupFee, setSignupFee] = useState("");
  const [noOfPagesFee, setPageFee] = useState();
  const [signupId, setSignupId] = useState();
  const [referralFee, setReferralFee] = useState();
  const [withdrawtoken, setWithdrawtoken] = useState();
  const [deposittoken, setDeposittoken] = useState();
  const [referralId, setReferralId] = useState();
  const [withdrawtokenId, setWithdrawtokenId] = useState();
  const [deposittokenId, setDeposittokenId] = useState();

  console.log("deposittokenId----", deposittokenId);

  useEffect(() => {
    if (auth?.userData?.userType === "User") {
      history.push("/explore")

    }
  }, [auth?.userData?.userType])

  const feelistHandler = async () => {
    // setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.feeList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (response.data.responseCode === 200) {
        setCollection(
          response.data.result.filter((data) => data?.type === "COLLECTION")
        );
        setAuction(
          response.data.result.filter((data) => data?.type === "AUCTION")
        );
        setSubscription(
          response.data.result.filter((data) => data?.type === "SUBCRIPTION")
        );
        setPostId(response.data.result.filter((data) => data?.type === "POST"));
        setSignupId(response.data.result.filter((data) => data?.type === "SIGNUP"));
        setReferralId(response.data.result.filter((data) => data?.type === "REFERREL"));
        setWithdrawtokenId(response.data.result.filter((data) => data?.type === "WITHDRAW_TOKEN"));
        setDeposittokenId(response.data.result.filter((data) => data?.type === "DEPOSIT_TOKEN"));
        // setIsLoading(false);
      }
    } catch (error) {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (collectionId) {
      setCollectionFee(collectionId[0]?.amount ? collectionId[0]?.amount : "");
    }
    if (auctionId) {
      setAuctionFee(auctionId[0]?.amount ? auctionId[0]?.amount : "");
    }
    if (postId) {
      setPostFee(postId[0]?.amount ? postId[0]?.amount : "");
    }
    if (subscriptionId) {
      setSubscriptionFee(
        subscriptionId[0]?.amount ? subscriptionId[0]?.amount : ""
      );
    }
    if (signupId) {
      setSignupFee(
        signupId[0]?.amount ? signupId[0]?.amount : ""
      );
    }
    if (referralId) {
      setReferralFee(
        referralId[0]?.amount ? referralId[0]?.amount : ""
      );
    }
    if (withdrawtokenId) {
      setWithdrawtoken(
        withdrawtokenId[0]?.amount ? withdrawtokenId[0]?.amount : ""
      );
    }
    if (deposittokenId) {
      setDeposittoken(
        deposittokenId[0]?.amount ? deposittokenId[0]?.amount : ""
      );
    }
  }, [collectionId, auctionId, postId, subscriptionId, signupId, referralId, withdrawtokenId, deposittokenId]);


  const subAdminHandler = async () => {
    setIsSubAdminLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.subAdminList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 10,
        },
      });
      if (response.data.responseCode === 200) {
        setIsSubAdminLoading(false);
        setAdminId(response.data._id);

        setSubAdmin(response.data.result.docs);
        setNoOfPages(response.data.result.docs.pages);

        // setIsLoading(false);
      }
      setIsSubAdminLoading(false);
    } catch (error) {
      setIsSubAdminLoading(false);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    feelistHandler();
    subAdminHandler();
  }, [page]);



  const collectionUpdate = async () => {
    setIsSubmit(true);
    if (Number(collectionFee) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: collectionId[0]?._id,
            amount: collectionFee,
          },
        });
        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          listInterestHandler();
          // setCollectionFee("");
          setIsSubmit(false);
        }
      } catch (error) {
        setIsSubmit(false);
      }
    }
  };

  const auctionUpdate = async () => {
    setIsSubmitAuction(true);
    if (Number(auctionFee) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: auctionId[0]?._id,
            amount: auctionFee,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmitAuction(false);
          listInterestHandler();
          toast.success(res.data.responseMessage);
          // setAuctionFee("");
        }
      } catch (error) {
        setIsSubmitAuction(false);
      }
    }
  };

  const subscriptionUpdate = async () => {
    setIsSubmitSubscription(true);
    if (Number(subscriptionFee) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: subscriptionId[0]?._id,
            amount: subscriptionFee,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmitSubscription(false);
          listInterestHandler();
          toast.success(res.data.responseMessage);
          // setAuctionFee("");
        }
      } catch (error) {
        setIsSubmitSubscription(false);
      }
    }
  };

  const postFeeUpdate = async () => {
    setIsSubmitPost(true);
    if (Number(postFee) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: postId[0]?._id,
            amount: postFee,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmitPost(false);
          listInterestHandler();
          toast.success(res.data.responseMessage);
          // setAuctionFee("");
        }
      } catch (error) {
        setIsSubmitPost(false);
      }
    }
  };

  const SubAdminDelete = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          userId: id,
        },
      });
      if (res.data.responseCode === 200) {
        subAdminHandler();
        setOpen(false);
        toast.success(res.data.responseMessage);
      }
    } catch (error) { }
  };

  const handlePopDelete = (data) => {
    setOpen(true);
    setUserData(data);
  };

  const handleDurationDelete = (data) => {
    setOpenDuration(true);
    setUserDuration(data);
  };

  const BlockAdmin = async (id) => {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.subAdminBlockUnblock,
        data: {
          _id: userData1?._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setOpen1(false);
        subAdminHandler();
        toast.success(res.data.responseMessage);
      }
    } catch (error) { }
  };

  const handlePopBlock = (data) => {
    setOpen1(true);
    setUserData1(data);
  };

  const listDurationHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.listDuration,
        params: {
          page: pageDuration,
          limit: 10,
        },
        // headers: {
        //   token: window.localStorage.getItem("token"),
        // },
        // data: {
        //   name: id,
        // },
      });
      if (res.data.responseCode === 200) {
        setSurationList(res.data.result.docs);
        setNoOfPagesDuration(res.data.result.docs.pages);
      }
    } catch (error) {
      setSurationList([]);
    }
  };

  const addDurationHandler = async () => {
    setIsSubmit(true);

    if (
      durationDay !== "" &&
      amountTime !== "" &&
      Number(amountTime) < 10000000 &&
      Number(durationDay) < 365
    ) {
      try {
        const res = await axios({
          method: "POST",
          url: ApiConfig.addDuration,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            duration: durationDay,
            amount: amountTime,
          },
        });
        if (res.data.responseCode === 200) {
          if (listDurationHandler()) {
            listDurationHandler();
          }
          setIsSubmit(false);
          setDurationDay("");
          setIsopenInterest(false);
          toast.success(res.data.responseMessage);
        }
      } catch (error) {
        toast.error(error?.response?.data.responseMessage);

        setIsSubmit(false);
      }
    }
  };

  useEffect(() => {
    listDurationHandler();
  }, [pageDuration]);

  const durationDeleteHandler = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteDuration,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          durationId: id,
        },
      });
      if (res.data.responseCode === 200) {
        if (listDurationHandler()) {
          listDurationHandler();
        }
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      if (error?.response?.data?.responseCode === 409) {
        listDurationHandler();
      }
    }
  };

  const listInterestHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.listInterest,
        params: {
          page: pageInterest,
          limit: 10,
        },
      });
      if (res.data.responseCode === 200) {
        setListIntrest(res.data.result.docs);
        setNoOfPagesInterest(res.data.result.pages);
        setIsadminLoading(false);
      }
    } catch (error) {
      setListIntrest([]);
      setIsadminLoading(false);
    }
  };

  useEffect(() => {
    listInterestHandler();
  }, [pageInterest]);

  const addIntrestHandler = async () => {
    setIsSubmitInterest(true);
    if (
      interestName !== "" &&
      interestName?.length < 50 &&
      isValidInterest(interestName)
    ) {
      try {
        const res = await axios({
          method: "POST",
          url: ApiConfig.createInterest,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            name: interestName,
          },
        });
        if (res.data.responseCode === 200) {
          if (listInterestHandler()) {
            listInterestHandler();
          }
          setIsSubmitInterest(false);
          setIsinterseName("");
          setIsopenInterestAdmin(false);
          toast.success(res.data.responseMessage);
        }
      } catch (error) {
        toast.error(error?.response?.data?.responseMessage);
        setIsSubmitInterest(false);
      }
    }
  };

  const handleIntersetsDelete = (data) => {
    setIsopenInterestDelete(true);
    setUserIntereset(data);
  };

  const InterestDeleteHandler = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.deleteInterest,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          interestId: id,
        },
      });
      if (res.data.responseCode === 200) {
        if (listInterestHandler()) {
          listInterestHandler();
        }
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      if (error?.response?.data?.responseCode === 409) {
        listInterestHandler();
      }
    }
  };

  const isValidInterest = (value) => {
    const re = /^[a-zA-Z\s]*$/; // eslint-disable-line no-useless-escape
    return re.test(String(value).toLowerCase());
  };

  const signupFeeUpdate = async () => {
    setIsSubmitPost(true);
    if (Number(signupFee) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: signupId[0]?._id,
            amount: signupFee,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmitPost(false);
          listInterestHandler();
          toast.success(res.data.responseMessage);
          // setAuctionFee("");
        }
      } catch (error) {
        setIsSubmitPost(false);
      }
    }
  };


  const referralFeeUpdate = async () => {
    setIsSubmitPost(true);
    if (Number(referralFee) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: referralId[0]?._id,
            amount: referralFee,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmitPost(false);
          listInterestHandler();
          toast.success(res.data.responseMessage);
          // setAuctionFee("");
        }
      } catch (error) {
        setIsSubmitPost(false);
      }
    }
  };
  const withdrawtokenUpdate = async () => {
    setIsSubmitPost(true);
    if (Number(withdrawtoken) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: withdrawtokenId[0]?._id,
            amount: withdrawtoken,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmitPost(false);
          listInterestHandler();
          toast.success(res.data.responseMessage);
          // setAuctionFee("");
        }
      } catch (error) {
        setIsSubmitPost(false);
      }
    }
  };
  const dposittokenUpdate = async () => {
    setIsSubmitPost(true);
    if (Number(deposittoken) > 0) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.feeUpdate,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          params: {
            feeId: deposittokenId[0]?._id,
            amount: deposittoken,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmitPost(false);
          listInterestHandler();
          toast.success(res.data.responseMessage);
          // setAuctionFee("");
        }
      } catch (error) {
        setIsSubmitPost(false);
      }
    }
  };



  return (
    <Box className={classes.root}>
      <Container>
        {auth?.userData?.userType === "Admin" && (
          <Box className={classes.main}>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={6} xs={6} md={6} align="left">
                <Box className={classes.heading} mb={2}>
                  <Typography variant="h3"> Sub Admin Management</Typography>
                </Box>
              </Grid>
              <Grid item lg={6} sm={6} xs={6} md={6} align="right">
                <Box mb={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={() => history.push("/add-subadmin")}
                  >
                    Add Sub Admin{" "}
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box className="content">
              <TableContainer>
                <Table>
                  <TableHead component={Paper} className="headingcell">
                    <TableRow>
                      <TableCell align="Center" className={classes.cell}>
                        Sr.No
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Name
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Email
                      </TableCell>

                      <TableCell align="Center" className={classes.cell}>
                        Mobile Number
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Gender
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Registration Date
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {subAdminList &&
                    subAdminList?.map((data, i) => {
                      return (
                        <TableBody key={i}>
                          <TableRow className={classes.tbody}>
                            <TableCell
                              align="Center"
                              component="th"
                              scope="row"
                            >
                              {i + 1}
                            </TableCell>
                            <TableCell align="Center">
                              {data?.userName ? data?.userName : data?.name}
                            </TableCell>
                            <TableCell align="Center">{data?.email}</TableCell>
                            <TableCell align="Center">
                              {data?.mobileNumber}
                            </TableCell>

                            <TableCell align="Center">{data?.gender}</TableCell>
                            <TableCell align="Center">
                              {moment(data?.createdAt).format("DD-MM-YYYY")}

                              {/* {data?.status} */}
                            </TableCell>
                            <TableCell align="Center">
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                {" "}
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  onClick={() => handlePopBlock(data)}
                                // onClick={() => {
                                //   handlePopBlock(data);
                                // }}
                                >
                                  {data?.status === "BLOCK"
                                    ? "Unblock"
                                    : "Block"}
                                </Button>
                                &nbsp;
                                <Button
                                  variant="contained"
                                  color="Primary"
                                  size="small"
                                  onClick={() => {
                                    handlePopDelete(data);
                                  }}
                                >
                                  Delete
                                </Button>{" "}
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })}
                </Table>
              </TableContainer>
            </Box>
            <Box className={classes.nodatafound}>
              {isSubAdminLoading ? (
                <DataLoading />
              ) : (
                <>
                  {subAdminList && subAdminList?.length > 0 ? (
                    <></>
                  ) : (
                    <NoDataFound />
                  )}
                </>
              )}
            </Box>
            {subAdminList && subAdminList.length >= 10 && (
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={noOfPages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                />
              </Box>
            )}
            <Dialog
              open={open}
              onClose={() => {
                setOpen(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xs"
              fullWidth
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description" align="center">
                  Are you sure you want to DELETE ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    SubAdminDelete(userData?._id);
                    setIsopenInterest(false);
                  }}
                  color="primary"
                  variant="contained"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  // onClick={() => {
                  //   setOpen(false);
                  //   // setIsopenInterest(false);
                  // }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open1}
              onClose={() => {
                setOpen1(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="xs"
              fullWidth
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description" align="center">
                  {`Are you sure you want to ${userData1?.status === "BLOCK" ? "ACTIVE" : "BLOCK"
                    }`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={BlockAdmin}
                  color="secondary"
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen1(false);
                  }}
                  color="primary"
                  autoFocus
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
        &nbsp;
        {/* {auth?.userData?.userType === "Admin" && ( */}
        <Box className={classes.main}>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6} xs={6} md={6} align="left">
              <Box className={classes.heading} mb={2}>
                <Typography variant="h3"> Duration Management</Typography>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={6} md={6} align="right">
              <Box mb={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={() => setIsopenInterest(true)}
                >
                  Add Duration{" "}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box className="content">
            <TableContainer>
              <Table>
                <TableHead component={Paper} className="headingcell">
                  <TableRow>
                    <TableCell align="Center" className={classes.cell}>
                      Sr.No
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Duration
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Amount
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Registration Date
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                {durationList?.map((data, i) => {
                  return (
                    <TableBody key={i}>
                      <TableRow className={classes.tbody}>
                        <TableCell align="Center" component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="Center">{data?.duration}</TableCell>
                        <TableCell align="Center">
                          {data?.amount} &nbsp;{tokenName}
                        </TableCell>

                        <TableCell align="Center">
                          {moment(data?.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="Center">
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            {" "}
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => {
                                handleDurationDelete(data);
                              }}
                            >
                              Delete
                            </Button>{" "}
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
            <Box className={classes.nodatafound}>
              {isSubAdminLoading ? (
                <DataLoading />
              ) : (
                <>
                  {durationList && durationList?.length > 0 ? (
                    <></>
                  ) : (
                    <NoDataFound />
                  )}
                </>
              )}
            </Box>
            {durationList && durationList.length >= 10 && (
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={noOfPagesDuration}
                  page={pageDuration}
                  onChange={(e, v) => setPageDuration(v)}
                />
              </Box>
            )}
          </Box>
          <Dialog
            open={openDuration}
            onClose={() => {
              setOpenDuration(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" align="center">
                Are you sure you want to DELETE this duration ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  durationDeleteHandler(userDuration?._id);
                  setOpenDuration(false);
                }}
                color="secondary"
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenDuration(false);
                }}
                color="primary"
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isOpenInterest}
            onClose={() => {
              setIsopenInterest(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" align="center">
                <Box>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    placeholder="Duration (in days)"
                    type="number"
                    fullWidth
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    value={durationDay}
                    error={
                      (isSubmit && durationDay === "") ||
                      (durationDay !== "" && Number(durationDay) < 1) ||
                      (durationDay !== "" && Number(durationDay) > 3649)
                    }
                    // error={
                    //   Boolean(isSubmit && durationDay === "") ||
                    //   (interestName !== "" && Number(durationDay) > 3650)
                    // }
                    onChange={(e) => setDurationDay(e.target.value)}
                  />
                  <FormHelperText error>
                    {(isSubmit && durationDay === "" && (
                      <Box ml={1}>Days is required</Box>
                    )) ||
                      (durationDay !== "" && Number(durationDay) > 3649 && (
                        <Box ml={1}>Days must be less than 10 years</Box>
                      )) ||
                      (durationDay !== "" && Number(durationDay) < 1 && (
                        <Box ml={1}>Days must be less than 0</Box>
                      ))}
                  </FormHelperText>
                </Box>
                <Box mt={2}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    placeholder="Amount"
                    type="number"
                    fullWidth
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    error={
                      Boolean(isSubmit && amountTime === "") ||
                      Number(amountTime) > 10000000
                    }
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <FormHelperText error>
                    {(isSubmit && amountTime === "" && (
                      <Box ml={1}>Amount is required</Box>
                    )) ||
                      (Number(amountTime) > 10000000 && (
                        <Box ml={1}>Amount must be less than 10 milion</Box>
                      ))}
                  </FormHelperText>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  setIsopenInterest(false);
                }}
                color="primary"
                autoFocus
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={addDurationHandler}
                color="Secondary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open1}
            onClose={() => {
              setOpen1(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" align="center">
                {`Are you sure you want to ${userData1?.status === "BLOCK" ? "ACTIVE" : "BLOCK"
                  }`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={BlockAdmin} color="primary">
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen1(false);
                }}
                color="secondary"
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" align="center">
                Are you sure you want to DELETE this sub admin ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  SubAdminDelete(userData?._id);
                  setIsopenInterest(false);
                }}
                color="secondary"
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
                color="primary"
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        &nbsp;
        {/* // )} */}
        {/* Interest Managment  */}&nbsp;&nbsp;
        <Box className={classes.main}>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6} xs={6} md={6} align="left">
              <Box className={classes.heading} mb={2}>
                <Typography variant="h3"> Interest Management</Typography>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={6} md={6} align="right">
              <Box mb={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={() => setIsopenInterestAdmin(true)}
                >
                  Add Interest{" "}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box className="content">
            <TableContainer>
              <Table>
                <TableHead component={Paper} className="headingcell">
                  <TableRow>
                    <TableCell align="Center" className={classes.cell}>
                      Sr.No
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Name
                    </TableCell>
                    {/* <TableCell align="Center" className={classes.cell}>
                      Amount
                    </TableCell> */}
                    <TableCell align="Center" className={classes.cell}>
                      Registration Date
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                {interestList?.map((data, i) => {
                  return (
                    <TableBody key={i}>
                      <TableRow className={classes.tbody}>
                        <TableCell align="Center" component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="Center">{data?.name}</TableCell>
                        {/* <TableCell align="Center">
                                  {data?.amount} &nbsp;{tokenName}
                                </TableCell> */}

                        <TableCell align="Center">
                          {moment(data?.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="Center">
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            {" "}
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => {
                                handleIntersetsDelete(data);
                              }}
                            >
                              Delete
                            </Button>{" "}
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
            <Box className={classes.nodatafound}>
              {isSubAdminIntersetLoading ? (
                <DataLoading />
              ) : (
                <>
                  {interestList && interestList?.length > 0 ? (
                    <></>
                  ) : (
                    <NoDataFound />
                  )}
                </>
              )}
            </Box>
            {interestList && interestList.length >= 10 && (
              <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={noOfPagesInterest}
                  page={pageInterest}
                  onChange={(e, v) => setPageInterest(v)}
                />
              </Box>
            )}
          </Box>

          <Dialog
            open={openInterestAdmin}
            onClose={() => {
              setIsopenInterestAdmin(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" align="center">
                <Box>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    placeholder="Interest"
                    type="text"
                    fullWidth
                    //   onKeyPress={(event) => {
                    //     if (event?.key === "-" || event?.key === "+") {
                    //       event.preventDefault();
                    //     }
                    //   }}
                    error={
                      Boolean(isSubmitInterest && interestName === "") ||
                      (interestName !== "" && interestName?.length > 50) ||
                      (interestName !== "" && !isValidInterest(interestName))
                    }
                    onChange={(e) => setIsinterseName(e.target.value)}
                  />
                  <FormHelperText error>
                    {(isSubmitInterest && interestName === "" && (
                      <Box ml={1}>Interest is required</Box>
                    )) ||
                      (interestName !== "" && interestName?.length > 50 && (
                        <Box ml={1}>Interest must be less than 50</Box>
                      )) ||
                      (interestName !== "" &&
                        !isValidInterest(interestName) && (
                          <Box ml={1}>Only alphabets are allowed</Box>
                        ))}{" "}
                  </FormHelperText>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsopenInterestAdmin(false);
                }}
                color="primary"
                autoFocus
                variant="contained"
              >
                Cancel
              </Button>
              {/* <Button onClick={addIntrestHandler} color="primary">
                Submit
              </Button> */}
              <Button
                variant="contained"
                onClick={addIntrestHandler}
                color="Secondary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isOpenInterestDelete}
            onClose={() => {
              setIsopenInterestDelete(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" align="center">
                Are you sure you want to DELETE this interest ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  InterestDeleteHandler(userInterest?._id);
                  setIsopenInterestDelete(false);
                }}
                color="secondary"
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setIsopenInterestDelete(false);
                }}
                color="primary"
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Box>







        &nbsp;
        {auth?.userData?.permissions?.feeManagement && (
          <Box className={classes.adminBox} mt={4}>
            <Box className={classes.heading}>
              <Typography variant="h3"> Fee Management</Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Auction Fee
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="userName"
                      placeholder="Enter fee"
                      onChange={(e) => setAuctionFee(e.target.value)}
                      value={auctionFee}
                      error={Boolean(
                        isSubmitAuction &&
                        (auctionFee === "" || Number(auctionFee) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {isSubmitAuction &&
                        (auctionFee === "" || Number(auctionFee) <= 0) && (
                          <Box ml={1}>Enter valid auction price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    onClick={auctionUpdate}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Subscription Fee
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="userName"
                      placeholder="Enter fee"
                      onChange={(e) => setSubscriptionFee(e.target.value)}
                      value={subscriptionFee}
                      error={Boolean(
                        isSubmitSubscription &&
                        (subscriptionFee === "" ||
                          Number(subscriptionFee) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {isSubmitSubscription &&
                        (subscriptionFee === "" ||
                          Number(subscriptionFee) <= 0) && (
                          <Box ml={1}>Enter valid subscription price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    onClick={subscriptionUpdate}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Collection Fee
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="userName"
                      placeholder="Enter fee"
                      error={Boolean(
                        isSubmit &&
                        (collectionFee === "" || Number(collectionFee) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) => setCollectionFee(e.target.value)}
                      value={collectionFee}
                    />
                    <FormHelperText error>
                      {isSubmit &&
                        (collectionFee === "" ||
                          Number(collectionFee) <= 0) && (
                          <Box ml={1}>Enter valid collection price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    onClick={collectionUpdate}
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Post Fee
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="userName"
                      placeholder="Enter fee"
                      onChange={(e) => setPostFee(e.target.value)}
                      value={postFee}
                      error={Boolean(
                        isSubmitPost && (postFee === "" || Number(postFee) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {isSubmitPost &&
                        (postFee === "" || Number(postFee) <= 0) && (
                          <Box ml={1}>Enter valid post price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    onClick={postFeeUpdate}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Signup Bonus
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="signup"
                      placeholder="Enter fee"
                      onChange={(e) => setSignupFee(e.target.value)}
                      value={signupFee}
                      error={Boolean(
                        isSubmitPost && (signupFee === "" || Number(signupFee) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {isSubmitPost &&
                        (signupFee === "" || Number(signupFee) <= 0) && (
                          <Box ml={1}>Enter valid signup price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    onClick={signupFeeUpdate}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Referral Bonus
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="referralFee"
                      placeholder="Enter fee"
                      onChange={(e) => setReferralFee(e.target.value)}
                      value={referralFee}
                      error={Boolean(
                        isSubmitPost && (referralFee === "" || Number(referralFee) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {isSubmitPost &&
                        (referralFee === "" || Number(referralFee) <= 0) && (
                          <Box ml={1}>Enter valid referral fee price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    onClick={referralFeeUpdate}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Withdraw Token Fee
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="withdrawtoken"
                      placeholder="Enter fee"
                      onChange={(e) => setWithdrawtoken(e.target.value)}
                      value={withdrawtoken}
                      error={Boolean(
                        isSubmitPost && (withdrawtoken === "" || Number(withdrawtoken) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {isSubmitPost &&
                        (withdrawtoken === "" || Number(withdrawtoken) <= 0) && (
                          <Box ml={1}>Enter valid withdraw token price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    onClick={withdrawtokenUpdate}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      color="primary.main"
                    >
                      Deposit Token Fee
                    </Typography>
                    <OutlinedInput
                      type="number"
                      variant="outlined"
                      size="small"
                      name="deposittoken"
                      placeholder="Enter fee"
                      onChange={(e) => setDeposittoken(e.target.value)}
                      value={deposittoken}
                      error={Boolean(
                        isSubmitPost && (deposittoken === "" || Number(deposittoken) <= 0)
                      )}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    <FormHelperText error>
                      {isSubmitPost &&
                        (deposittoken === "" || Number(deposittoken) <= 0) && (
                          <Box ml={1}>Enter valid deposit token price</Box>
                        )}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    style={{
                      marginTop: "25px",
                      marginLeft: "11px",
                      fontSize: "11px",
                    }}
                    onClick={dposittokenUpdate}
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
