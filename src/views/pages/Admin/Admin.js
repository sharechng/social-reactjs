import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Grid,
  Container,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NoDataFound from "src/component/NoDataFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import Axios from "axios";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import { MdOutlineCollections } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import moment from "moment";
import { toast } from "react-toastify";
import { sortAddress } from "src/utils";
import BundlesCard from "src/component/BundlesCard";
import AuctionCard from "src/component/AuctionCard";
import { GoGitPullRequest } from "react-icons/go";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import BundlesDetailsCardAdmin from "src/component/BundlesDetailsCardAdmin";
import { FiCopy } from "react-icons/fi";
import CopyToClipboard from "react-copy-to-clipboard";
import { AuthContext } from "src/context/Auth";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { AiOutlineDownload } from "react-icons/ai";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .imgbox": {
      position: "relative",
      "& .editicon": {
        position: "absolute",
        bottom: "10px",
        right: "10px",
      },
      "& .postImg": {
        width: "100%",
        margin: "16px 0",
        borderRadius: "20px 20px 0px 0px",
        overflow: "hidden",
        [theme.breakpoints.down("xs")]: {
          borderRadius: "8px 8px 0px 0px",
        },
        "& img": {
          width: "100%",
          height: "250px",
          "@media(max-width:767px)": {
            height: "130px",
          },
        },
      },
    },
    "& .userProfile": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      marginTop: "-20px",
      "& figure": {
        borderRadius: "50%",
        border: "2px solid #f1f1f1",
        maxWidth: "150px",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 auto 13px",
        "@media(max-width:767px)": {
          maxWidth: "75px",
        },
      },
      "& .editprofile": {
        position: "absolute",
        bottom: "-40px",
        right: "-10px",
      },
      "& .user": {
        position: "absolute",
        marginLeft: "15px",
        "& img": {
          width: "100%",
        },
      },
    },
    "& .username": {
      marginTop: "75px",
      marginLeft: "25px",
      "@media(max-width:767px)": {
        marginTop: "45px",
      },
      "& p": {
        padding: "5px 0px",
        overflow: "hidden",
        maxWidth: "150px",
        textOverflow: "ellipsis",
      },
    },
    "& .buttonbox": {
      "& Button": {
        margin: "0px 15px",
      },
    },
    "& .detail": {
      margin: "15px",
      padding: "15px",
      backgroundColor: "#101010",
    },
  },

  main: {
    marginTop: "40px",
    backgroundColor: "#242526",
    padding: "15px",
    borderRadius: "10px",
    "& .content": {
      backgroundColor: "#101010",
      // width: "100%",
      padding: "15px",
      color: "#e6e5e8",
      "& .heading": {
        paddingBottom: "15px",

        "& h3": {},
      },
    },
  },
  cell: {
    fontSize: "14px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
  },
  TabButtonsBox: {
    borderTop: "0.5px solid gray",
    marginBottom: "29px",
    textAlign: "center",
    "& button": {
      color: "#9E9E9E",
      fontSize: "16px",
      borderBottom: "2px solid transparent",
      borderRadius: 0,
      "&.active": {
        color: "#fff",
        borderTop: "1px solid #fff",
        marginTop: "-1px",
      },
    },
  },

}));
const currenciesUser = [
  {
    value: "ACTIVE",
    label: "ACTIVE",
  },
  {
    value: "BLOCK",
    label: "BLOCK",
  },
];
function TransactionHistory({ data, index }) {
  const classes = useStyles();
  const [transactionListData, setTransactionList] = useState([]);
  const [transactionListDataAll, setTransactionListAll] = useState([]);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContent, setIsCollectionLoading] = useState(true);
  const auth = useContext(AuthContext);

  const [idds, setIdd] = useState("");
  const [isBlock, setBlock] = React.useState(false);
  const [loader2, setloader2] = React.useState(false);
  const [tabview, setTabView] = useState("OnSale");
  const [searchUserName, setSearchUserName] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [typeactivty, setTypeactivty] = useState("All");
  const [pageAuction, setPageAuction] = useState(1);
  const [noOfPagesAuction, setNoOfPagesAuction] = useState(1);
  const [collectionlistAll, setCollectionlist] = useState([]);
  const [postList, setPostList] = useState([]);
  const [auctionList, setAuctionList] = useState([]);
  const [blockUserList, setBlockUserList] = useState([]);
  const [pageCollection, setPageCollection] = useState(1);
  const [noOfPagesCollection, setNoOfPagesCollectionList] = useState(1);
  const [pagePost, setPagePost] = useState(1);
  const [noOfPagesPost, setNoOfPagesPostList] = useState(1);
  useEffect(() => {
    if (auth?.userData?.userType === "User") {
      history.push("/explore")

    }
  }, [auth?.userData?.userType])

  const handleBlock = (id) => {
    setIdd(id._id);
    setBlock(true);

    //   openBlock();
  };
  const adminUserListHandler = async () => {

    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.listUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 15,
          search: searchUserName ? searchUserName : null,
          fromDate: timeFilter ? `${moment(timeFilter)}` : null,
          toDate: toTimeFilter ? `${moment(toTimeFilter)}` : null,
          statusType: typeactivty === "All" ? null : typeactivty,
        },

      });

      if (res.data.responseCode === 200) {
        setIsClear(false);
        setTransactionList(res.data.result.docs);

        setNoOfPages(res.data.result.pages);
      } else {
        setIsClear(false);
        setTransactionList([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsClear(false);
      setTransactionList([]);
      setIsLoading(false);
    }
  };
  const adminUserListHandlerForCSV = async () => {
    // setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.AllUser,
        // headers: {
        //   token: window.localStorage.getItem("token"),
        // },
      });

      if (res.data.responseCode === 200) {
        setTransactionListAll(
          res.data.result?.map((data, i) => {
            return {
              Username: data.userName ? data.userName : null,
              Email: data.email ? data.email : null,
              Mobilenumber: `${data.countryCode} ${data.mobileNumber}`,
              Walletaddress: data.bnbAccount.address
                ? data.bnbAccount.address
                : null,
              RegistrationDate: moment(data.createdAt).format("lll"),
              Status: data.status ? data.status : null,
              StoryStatus: data.isStory ? data.isStory : null,
              SocialStory: data.isSocial ? data.isSocial : null,
            };
          })
        );
      } else {
        // setIsClear(false);
        // setTransactionList([]);
      }
      // setIsLoading(false);
    } catch (error) {
      // setIsClear(false);
      // setTransactionList([]);
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    // if (page) {
    adminUserListHandler();
    adminUserListHandlerForCSV();
    // }
  }, [page, isClear]);

  const blockuser = async () => {
    setloader2(true);
    Axios({
      method: "POST",
      url: Apiconfigs.userBlockUnblockAdmin,
      data: {
        _id: idds,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setloader2(false);
        if (res.data.responseCode === 200) {
          if (adminUserListHandler) {
            adminUserListHandler();
          }
          toast.success(res.data.responseMessage);
          setBlock(false);
          setloader2(false);

          if (res.data.result.docs) {
            toast.success(res.response_message);
            setloader2(false);
          }
        }
      })
      .catch(() => {
        setloader2(false);
      });
  };


  const collectionList = async () => {
    try {
      const response = await Axios({
        method: "GET",
        url: Apiconfigs.listCollection,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: pageCollection,
          limit: 9,
        },
      });
      if (response.data.responseCode === 200) {
        setCollectionlist(response.data.result.docs);
        setNoOfPagesCollectionList(response.data.result.pages);
        setIsCollectionLoading(false);
      }
      setIsCollectionLoading(false);
    } catch (error) {
      setIsCollectionLoading(false);
    }
  };
  const listPostAdminHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.postListAdmin,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          limit: 9,
          page: pagePost,
        },
      });
      if (res.data.responseCode === 200) {
        setPostList(res.data.result.docs);
        setNoOfPagesPostList(res.data.result.pages);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const allAuctionListHandler = async () => {
    try {
      const res = await Axios.get(Apiconfigs.listAuction, {
        params: {
          limit: 10,
          page: noOfPagesAuction,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setAuctionList(res.data.result.docs);
        setNoOfPagesAuction(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const listBlockAdminHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.requestList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setBlockUserList(res.data.result);
        // setNoOfPages(res.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    collectionList();
    listPostAdminHandler();
    allAuctionListHandler();
    listBlockAdminHandler();
  }, [pageCollection, pagePost, noOfPagesAuction]);
  const clearHandler = () => {
    setTimeFilter();
    setToTimeFilter();
    setTypeactivty("All");
    setSearchUserName("");
    setIsClear(true);
    // adminUserListHandler();
  };

  const closeBlock = () => {
    setBlock(false);
  };
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(transactionListDataAll);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user_list.xlsx");
  };
  const pageCheck = page === 1 ? 15 : 0
  return (
    <>
      <Box className={classes.root}>
        <Container>
          {auth?.userData?.permissions?.userManagement && (
            <>
              <Box className={classes.main}>
                <Box className={classes.heading}>
                  <Typography
                    variant="h3"
                    // color="primary.main"
                    style={{ color: "#e6e5e8" }}
                  >
                    User Management
                  </Typography>
                  <Typography
                    variant="h3"
                    // color="primary.main"
                    style={{ color: "#e6e5e8" }}
                  >
                    {transactionListDataAll &&
                      transactionListDataAll?.length > 0 && (
                        <AiOutlineDownload
                          onClick={downloadExcel}
                          style={{
                            color: "#e31a89",
                            marginRight: "10px",
                            fontSize: "32px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                      <Typography
                        variant="boay2"
                        style={{ color: "#cfc8c8" }}
                      // color="primary.main"
                      >
                        From
                      </Typography>
                      <Box mt={1}>
                        <KeyboardDatePicker
                          style={{ maxHeight: "39px" }}
                          value={timeFilter}
                          onChange={(date) => {
                            setTimeFilter(new Date(date));
                          }}
                          // maxDate={toTimeFilter ? toTimeFilter : ""}
                          format="DD/MM/YYYY"
                          inputVariant="outlined"
                          placeholder="-select date-"
                          disableFuture={true}
                          InputLabelProps={{ shrink: true }}
                          margin="dense"
                          variant="outlined"
                          helperText=""
                          name="dob"
                          fullWidth
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                      <Typography
                        variant="boay2"
                        style={{ color: "#cfc8c8" }}
                      // color="primary.main"
                      >
                        To
                      </Typography>
                      <Box mt={1}>
                        <FormControl>
                          <KeyboardDatePicker
                            style={{ maxHeight: "39px" }}
                            inputVariant="outlined"
                            value={toTimeFilter}
                            onChange={(date) => {
                              setToTimeFilter(new Date(date));
                            }}
                            minDate={timeFilter}
                            //   maxDate={moment(toTimeFilter).format("YYYY-MM-DDThh:mm")}
                            format="DD/MM/YYYY"
                            // inputVariant="outlined"
                            disableFuture={true}
                            InputLabelProps={{ shrink: true }}
                            margin="dense"
                            helperText=""
                            name="dob"
                            fullWidth
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                      <Typography
                        variant="boay2"
                        style={{ color: "#cfc8c8", marginTop: "-2px" }}
                      // color="primary.main"
                      >
                        By Type
                      </Typography>
                      <Box mt={1}>
                        <FormControl fullWidth className={classes.formControl}>
                          {/* <InputLabel id="demo-simple-select-label">
                            Age
                          </InputLabel> */}
                          <Select
                            style={{ minHeight: "44px", marginTop: "2px" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //   value={age}
                            variant="outlined"
                            onChange={(e) => setTypeactivty(e.target.value)}
                            value={typeactivty}
                          >
                            <MenuItem disableScrollLock={true} value={"All"}>
                              All
                            </MenuItem>
                            {currenciesUser.map((option, i) => (
                              <MenuItem
                                disableScrollLock={true}
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                      <Typography
                        variant="boay2"

                        style={{ color: "#cfc8c8", marginTop: "-2px" }}
                        className={classes.searchbox}
                      // color="primary.main"
                      >
                        Search
                      </Typography>
                      <Box
                        mt={1}
                      // style={{ minHeight: "43px", marginTop: "-2px" }}
                      >
                        <FormControl fullWidth>
                          <TextField
                            style={{ minHeight: "43px", marginTop: "-2px" }}
                            variant="outlined"
                            fullWidth
                            placeholder="Search by user name"
                            type="search"
                            onChange={(e) => setSearchUserName(e.target.value)}
                            value={searchUserName}
                            InputProps={{
                              startAdornment: (
                                <FiSearch
                                  position="start"
                                  style={{ fontSize: "16px" }}
                                />
                              ),
                            }}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                      <Box
                        style={{
                          display: "flex",
                          // justifyContent: "flex-end",
                          marginTop: "24px",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={adminUserListHandler}
                          color="secondary"
                          style={{ marginRight: "10px" }}
                        >
                          Submit
                        </Button>

                        <Button
                          variant="contained"
                          onClick={clearHandler}
                          color="secondary"
                          style={{ width: "90px" }}
                        >
                          Clear
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                &nbsp;
                <Box
                  className="content"
                  style={{ background: "#000", padding: "15px" }}
                >
                  {isLoading ? (
                    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <DataLoading />
                    </Box>

                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead component={Paper} className="headingcell">
                          <TableRow>
                            <TableCell align="Center" className={classes.cell}>
                              Sr.No
                            </TableCell>
                            <TableCell align="Center" className={classes.cell}>
                              User Name
                            </TableCell>
                            <TableCell align="Center" className={classes.cell}>
                              Wallet Address
                            </TableCell>
                            {/* <TableCell align="Center" className={classes.cell}>
                        Order Count
                      </TableCell>

                      <TableCell align="Center" className={classes.cell}>
                        Total Earning
                      </TableCell> */}
                            <TableCell align="Center" className={classes.cell}>
                              Status
                            </TableCell>
                            <TableCell align="Center" className={classes.cell}>
                              Registration Date
                            </TableCell>

                            <TableCell align="Center" className={classes.cell}>
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {transactionListData?.map((data, i) => {
                          return (
                            <TableBody key={i}>
                              <TableRow className={classes.tbody}>
                                <TableCell
                                  align="Center"
                                  component="th"
                                  scope="row"
                                >
                                  {(page - 1) * 15 + i + 1}
                                </TableCell>
                                <TableCell align="Center">
                                  {data?.userName ? data?.userName : data?.name}
                                </TableCell>
                                <TableCell align="Center">
                                  {sortAddress(data?.bnbAccount?.address)}&nbsp;
                                  <CopyToClipboard
                                    text={data?.bnbAccount?.address}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <FiCopy
                                      onClick={() => toast.info("Copied")}
                                    />
                                  </CopyToClipboard>
                                  {/* <IoMdCopy /> */}
                                </TableCell>
                                {/* <TableCell align="Center">0 </TableCell>
                          <TableCell align="Center">0 </TableCell> */}
                                <TableCell align="Center">
                                  {data?.status}{" "}
                                </TableCell>
                                <TableCell align="Center">
                                  {moment(data?.createdAt).format("DD-MM-YYYY")}
                                </TableCell>
                                <TableCell align="Center">
                                  <Box
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Button
                                      // variant="contained"
                                      onClick={() =>
                                        history.push({
                                          pathname: "/about-creators",
                                          search: data._id,
                                        })
                                      }
                                      color="primary"
                                    >
                                      <VisibilityIcon />
                                    </Button>
                                    {data?.status === "BLOCK" ? (
                                      <Button
                                        // variant="contained"
                                        color="primary"
                                      // className={classes.button}
                                      // onClick={() => handleBlock(data)}
                                      >
                                        <BlockIcon
                                          //   fontSize="small"
                                          style={{
                                            fontSize: "15px",
                                            color: "red",
                                          }}
                                        />
                                      </Button>
                                    ) : (
                                      <Button
                                        // variant="contained"
                                        color="primary"
                                        // className={classes.button}
                                        onClick={() => handleBlock(data)}
                                      >
                                        <BlockIcon
                                          //   fontSize="small"
                                          style={{
                                            fontSize: "15px",
                                            color: "green",
                                          }}
                                        />
                                      </Button>
                                    )}
                                    {/* <Button
                                      // variant="contained"
                                      color="primary"
                                      // className={classes.button}
                                      onClick={() => handleBlock(data)}
                                    >
                                      <BlockIcon
                                        //   fontSize="small"
                                        style={
                                          data?.status === "BLOCK"
                                            ? { fontSize: "15px", color: "red" }
                                            : {
                                                fontSize: "15px",
                                                color: "green",
                                              }
                                        }
                                      />
                                    </Button> */}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          );
                        })}
                      </Table>
                    </TableContainer>
                  )}
                  {!isLoading &&
                    transactionListData &&
                    transactionListData.length === 0 && <NoDataFound />}

                  {transactionListData && transactionListData.length >= pageCheck && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Pagination
                        count={noOfPages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
          <Box className={classes.main}>
            <Dialog
              open={isBlock}
              onClose={closeBlock}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {/* {row.status} */}
                  {`Are you sure  to ${idds.status === "BLOCK" ? "ACTIVE" : "BLOCK"
                    } this user?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="secondary" disabled={loader2} onClick={blockuser}>
                  Yes {loader2 && <ButtonCircularProgress />}
                </Button>
                <Button onClick={closeBlock} variant='contained' color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>

            <Box className={classes.whitebox} align="center" mt={5}>
              <Container>
                <Box className={classes.idtxt}>
                  <Box className={classes.TabButtonsBox}>
                    <Button
                      variant="h6"
                      className={tabview === "OnSale" ? "active" : ""}
                      onClick={() => setTabView("OnSale")}
                    >
                      <MdOutlineCollections style={{ marginRight: "5px" }} />
                      Collection
                    </Button>
                    <Button
                      className={tabview === "Owned" ? "active" : " "}
                      onClick={() => setTabView("Owned")}
                    >
                      <BsFillFileEarmarkPostFill
                        style={{ marginRight: "5px" }}
                      />
                      Post
                    </Button>

                    <Button
                      className={tabview === "auction" ? "active" : " "}
                      onClick={() => setTabView("auction")}
                    >
                      <AddToHomeScreenIcon style={{ marginRight: "5px" }} />{" "}
                      Auction
                    </Button>

                  </Box>
                </Box>
              </Container>
            </Box>
            <Box mt={3}>
              {tabview === "OnSale" ? (
                <>
                  {isLoadingContent ? (
                    <DataLoading />
                  ) : (
                    <Grid container spacing={2}>
                      {collectionlistAll && collectionlistAll.length === 0 && (
                        <NoDataFound />
                      )}
                      {collectionlistAll &&
                        collectionlistAll?.map((data, i) => {
                          return (
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                              <BundlesCard
                                //   collectionListBundle={collectionListBundle}
                                calBackFunc={collectionList}
                                noOfPages={noOfPages}
                                //   particularUserList={particularUserList}
                                //   userId={userId}
                                data={data}
                                type="card"
                                key={i}
                              />
                            </Grid>
                          );
                        })}
                    </Grid>
                  )}
                  {collectionlistAll && collectionlistAll.length >= 8 && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Pagination
                        count={noOfPagesCollection}
                        page={pageCollection}
                        onChange={(e, v) => setPageCollection(v)}
                      />
                    </Box>
                  )}
                </>
              ) : (
                ""
              )}

              {/* {tabview === "Owned" ? <Owned /> : ""} */}
              {tabview === "Owned" && (
                <Box mt={3}>
                  <Grid container spacing={2}>
                    {postList && postList?.length > 0 ? (
                      <>
                        {postList &&
                          postList?.map((data, i) => {
                            return (
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <BundlesDetailsCardAdmin
                                  listPublicExclusiveHandler={
                                    listPostAdminHandler
                                  }
                                  type="card"
                                  data={data}
                                  key={i}
                                />
                              </Grid>
                            );
                          })}
                      </>
                    ) : (
                      <NoDataFound />
                    )}
                  </Grid>
                  {postList && postList.length > 8 && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Pagination
                        count={noOfPagesPost}
                        page={pagePost}
                        onChange={(e, v) => setPagePost(v)}
                      />
                    </Box>
                  )}
                </Box>
              )}
              {tabview === "auction" && (
                <Box mt={3}>
                  <Grid container spacing={2}>
                    {auctionList && auctionList?.length > 0 ? (
                      <>
                        {auctionList &&
                          auctionList?.map((data, i) => {
                            return (
                              <Grid item xs={12} sm={6} md={4} lg={4}>
                                <AuctionCard
                                  callbackFun={allAuctionListHandler}
                                  type="card"
                                  data={data}
                                  key={i}
                                />
                              </Grid>
                            );
                          })}
                      </>
                    ) : (
                      <NoDataFound />
                    )}
                  </Grid>
                  {auctionList && auctionList.length >= 10 && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Pagination
                        count={noOfPagesAuction}
                        page={pageAuction}
                        onChange={(e, v) => setPageAuction(v)}
                      />
                    </Box>
                  )}
                </Box>
              )}
              {/* {tabview === "blockUsers" && (
              <Box mt={3}>
                <Typography variant="h3" style={{ marginBottom: "30px" }}>
                  {" "}
                  All Requested Block Users
                </Typography>

                <Grid container spacing={2}>
                  {blockUserList && blockUserList?.length > 0 ? (
                    <>
                      {blockUserList && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <BlockUserPage
                            callbackFun={listBlockAdminHandler}
                            // type="card"
                            isLoading={isLoading}
                            setPage={setPage}
                            page={page}
                            blockUserList={blockUserList}
                            // data={data}
                            // key={i}
                          />
                        </Grid>
                      )}
                    </>
                  ) : (
                    <NoDataFound />
                  )}
                </Grid>
                {postList && postList.length !== 0 && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <Pagination
                      count={noOfPages}
                      page={page}
                      onChange={(e, v) => setPage(v)}
                    />
                  </Box>
                )}
              </Box>
            )} */}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default TransactionHistory;
