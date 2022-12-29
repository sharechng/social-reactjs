import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { FaRegEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NoDataFound from "src/component/NoDataFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import Axios from "axios";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import moment from "moment";
import { toast } from "react-toastify";
import { sortAddressDescription } from "src/utils";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { FiCopy } from "react-icons/fi";
import CopyToClipboard from "react-copy-to-clipboard";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    "& .content": {
      backgroundColor: "#000000",
      paddingTop: "10px",
      margin: "30px 0px",
    },
  },
  cell: {
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
}));

function Static({ data, index }) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [staticContentListData, setStaticContentListData] = useState([]);
  // console.log("staticContentListData", staticContentListData);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContent, setIsCollectionLoading] = useState(true);
  const [idds, setIdd] = useState("");
  const [isBlock, setBlock] = React.useState(false);
  const [loader2, setloader2] = React.useState(false);
  const [tabview, setTabView] = useState("OnSale");
  const [searchUserName, setSearchUserName] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [typeactivty, setTypeactivty] = useState("");
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
    if (auth?.userData?.userType !== "Admin") {
      history.push("/explore")

    }
  }, [auth?.userData?.userType])
  const staticContentListHandler = async () => {
    // setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.staticContentList,
        // headers: {
        //   token: window.localStorage.getItem("token"),
        // },
      });

      if (res.data.responseCode === 200) {
        // setIsClear(false);
        setStaticContentListData(res.data.result);
        setNoOfPages(res.data.result.pages);
      } else {
        setIsClear(false);
        setStaticContentListData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsClear(false);
      setStaticContentListData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    staticContentListHandler();
  }, []);

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
          if (staticContentListHandler) {
            staticContentListHandler();
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
    setTypeactivty("");
    setSearchUserName("");
    setIsClear(true);
    // staticContentListHandler();
  };
  const closeBlock = () => {
    setBlock(false);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Box className="heading">
          <Typography
            variant="h3"
            color="primary.main"
            style={{ color: "#e6e5e8" }}
          >
            Static Data
          </Typography>
          {/* <Box align="right">
            <Button
              color="secondary"
              variant="contained"
              onClick={() => history.push("/add-static-content")}
            >
              <AddBoxIcon />
              &nbsp; Add Content
            </Button>
          </Box> */}
        </Box>
        <Box className="content">
          <Box>
            {isLoading ? (
              <DataLoading />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead component={Paper} className="headingcell">
                    <TableRow>
                      <TableCell align="Center" className={classes.cell}>
                        Sr.No.
                      </TableCell>
                      <TableCell align="Center" style={{ minWidth: '150px' }} className={classes.cell} >
                        Title
                      </TableCell>
                      <TableCell align="center" style={{ maxWidth: '350px' }} >
                        Description
                      </TableCell>
                      <TableCell align="Center" style={{ minWidth: '150px' }} className={classes.cell}>
                        Registration Date
                      </TableCell>
                      <TableCell align="Center" className={classes.cell}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {staticContentListData?.map((data, i) => {
                    return (
                      <TableBody key={i}>
                        <TableRow className={classes.tbody}>
                          <TableCell align="Center" component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell align="Center">{data?.title}</TableCell>
                          <TableCell align="Center">
                            {data?.description?.length <= 50 ? (
                              <label
                                dangerouslySetInnerHTML={{
                                  __html: data?.description,
                                }}
                              ></label>
                            ) : data?.description.length > 50 ? (
                              <label
                                // style={{
                                //   wordBreak: "break-all",
                                // }}
                                dangerouslySetInnerHTML={{
                                  __html: data?.description,
                                }}
                              ></label>
                            ) : (
                              ""
                            )}
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
                              {/* <Button
                                // variant="contained"
                                onClick={() =>
                                  history.push({
                                    pathname: "/about-creators",
                                    search: data._id,
                                  })
                                }
                                color="primary"
                              >
                                <FaRegEdit />
                              </Button> */}
                              <Button
                                variant="contained"
                                onClick={() =>
                                  history.push({
                                    pathname: "/edit-static-content",
                                    search: data?.type,
                                  })
                                }
                                color="primary"
                              >
                                <FaRegEdit />
                              </Button>
                              &nbsp;
                              <Button
                                variant="contained"
                                color="primary"
                                // className={classes.button}
                                onClick={() =>
                                  history.push({
                                    pathname: "/static-content-details",
                                    search: data?.type,
                                  })
                                }
                              >
                                <VisibilityIcon />
                              </Button>
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
              staticContentListData &&
              staticContentListData.length === 0 && <NoDataFound />}
          </Box>
        </Box>
        <Dialog
          open={isBlock}
          onClose={closeBlock}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* {row.status} */}
              {`Are you sure  to ${idds.status === "BLOCK" ? "ACTIVE" : "DELETE"
                } this user?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" disabled={loader2} onClick={blockuser}>
              Yes {loader2 && <ButtonCircularProgress />}
            </Button>
            <Button onClick={closeBlock} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
}

export default Static;
