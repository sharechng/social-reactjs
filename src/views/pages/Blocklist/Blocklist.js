import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Grid,
  Container,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import NoDataFound from "src/component/NoDataFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import Axios from "axios";
import { Pagination } from "@material-ui/lab";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { GoGitPullRequest } from "react-icons/go";
import BlockUserPage from "src/component/BlockUserPage";
import BlockListPost from "./BlockListPost";
import { AuthContext } from "src/context/Auth";
import DataLoading from "src/component/DataLoading";

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
    padding: "15px",
    "& .content": {
      backgroundColor: "#101010",
      // width: "100%",
      padding: "15px",
      "& .heading": {
        paddingBottom: "15px",
      },
    },
  },
  cell: {
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  heading: {
    "& h3": {
      padding: "25px",
    },
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
  mainBox: {
    padding: "100px 0",
  },
}));

function TransactionHistory({ data, index }) {
  const classes = useStyles();
  const [transactionListData, setTransactionList] = useState([]);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContent, setIsCollectionLoading] = useState(true);
  const auth = useContext(AuthContext);

  const [idds, setIdd] = useState("");
  const [isBlock, setBlock] = React.useState(false);
  const [loader2, setloader2] = React.useState(false);
  const [tabview, setTabView] = useState(
    auth?.userData?.permissions?.postManagement ? "Owned" : "blockUsers"
  );
  const [searchUserName, setSearchUserName] = useState("");
  const [noOfPagesBlockUser, setNoOfPagesBlockusers] = useState(1);
  const [pageBlockeUsers, setPageBlockusers] = useState(1);
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
    // setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.listUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          search: searchUserName ? searchUserName : null,
        },
        // params: {
        //   page: page,
        //   limit: 9,
        // },
      });

      if (res.data.responseCode === 200) {
        setTransactionList(res.data.result.docs);
        //   setNoOfPages(res.data.result.pages);
      } else {
        setTransactionList([]);
      }
      setIsLoading(false);
    } catch (error) {
      setTransactionList([]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (searchUserName) {
      adminUserListHandler();
    } else {
      adminUserListHandler();
    }
  }, [searchUserName]);

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
  const [collectionlistAll, setCollectionlist] = useState([]);
  const [postList, setPostList] = useState([]);
  const [auctionList, setAuctionList] = useState([]);
  const [blockUserList, setBlockUserList] = useState([]);
  const listPostAdminHandler = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.reportsList + "POST",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          limit: 9,
          page: page,
        },
      });
      if (res.data.responseCode === 200) {
        setPostList(res.data.result.docs);
        setIsLoading(false);
        setNoOfPages(res.data.result.pages);
      }
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
        params: {
          limit: 9,
          page: pageBlockeUsers,
        },
      });
      if (res.data.responseCode === 200) {
        setBlockUserList(res.data.result);
        setNoOfPagesBlockusers(res.data.result.pages);

        setIsLoading(false);
      }
    } catch (error) {
      setBlockUserList();

      setIsLoading(false);
    }
  };
  useEffect(() => {
    listPostAdminHandler();

    listBlockAdminHandler();
  }, [page, pageBlockeUsers]);

  const closeBlock = () => {
    setBlock(false);
  };

  return (
    <>
      <Box className={classes.mainBox}>
        <Paper className={classes.root} elevation={2}>
          <Box className={classes.main}>
            <Box className={classes.whitebox} align="center" mt={5}>
              <Container>
                <Box className={classes.idtxt}>
                  <Box className={classes.TabButtonsBox}>
                    {auth?.userData?.permissions?.postManagement && (
                      <Button
                        className={tabview === "Owned" ? "active" : " "}
                        onClick={() => setTabView("Owned")}
                      >
                        <BsFillFileEarmarkPostFill
                          style={{ marginRight: "5px" }}
                        />
                        Reported Post
                      </Button>
                    )}
                    {auth?.userData?.permissions?.userManagement && (
                      <Button
                        className={tabview === "blockUsers" ? "active" : " "}
                        onClick={() => setTabView("blockUsers")}
                      >
                        <GoGitPullRequest style={{ marginRight: "5px" }} />{" "}
                        Blocked users
                      </Button>
                    )}
                  </Box>
                </Box>
              </Container>
            </Box>
            <Box mt={3}>
              {/* {tabview === "Owned" ? <Owned /> : ""} */}
              {tabview === "Owned" && (
                <Box mt={3}>
                  <Typography variant="h3" style={{ marginBottom: "30px" }}>
                    {" "}
                    Reported Post
                  </Typography>

                  <Grid container spacing={2}>
                    {isLoading ? (
                      <DataLoading />
                    ) : (
                      <>
                        {postList && postList?.length > 0 ? (
                          <>
                            {postList &&
                              postList?.map((data, index) => {
                                return (
                                  <Grid item xs={12} sm={6} md={4} lg={4}>
                                    <BlockListPost
                                      listPublicExclusiveHandler={
                                        listPostAdminHandler
                                      }
                                      type="card"
                                      data={data}
                                      index={index}
                                    />
                                  </Grid>
                                );
                              })}
                          </>
                        ) : (
                          <NoDataFound />
                        )}
                      </>
                    )}
                  </Grid>
                  {postList && postList.length > 3 && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Pagination
                        count={noOfPages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                      />
                    </Box>
                  )}
                </Box>
              )}

              {tabview === "blockUsers" && (
                <Box mt={3}>
                  <Typography variant="h3" style={{ marginBottom: "30px" }}>
                    {" "}
                    All Requested Blocked Users
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
                  {blockUserList && blockUserList.length > 9 && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <Pagination
                        count={noOfPagesBlockUser}
                        page={pageBlockeUsers}
                        onChange={(e, v) => setPageBlockusers(v)}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default TransactionHistory;
