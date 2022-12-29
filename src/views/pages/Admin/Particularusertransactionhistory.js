import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Grid,
  Container,
  Button,
  IconButton,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { FaCopy } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
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
import { tokenName } from "src/utils";

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
}));

function TransactionHistory({ data, index, userId }) {
  const classes = useStyles();
  const [transactionListData, setTransactionList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const transactionhistory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.transactionListWithUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          limit: 10,
          page: page,
          userId: userId,
        },
      });
      if (res.data.responseCode === 200) {
        setTransactionList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    transactionhistory();
  }, [page]);

  return (
    <>
      {/* <Paper className={classes.root} elevation={2}> */}
      {/* <Box className="imgbox">
          <figure className="postImg">
            <img src="images/profile/Profile.png" alt="banner image" />
          </figure>
          <IconButton
            style={{ backgroundColor: "#FFF" }}
            className="editicon"
            onClick={() => history.push("/settings")}
          >
            <GrEdit />
          </IconButton>
        </Box> */}
      {/* <Grid container spacing={1}>
          <Grid item xs={12} sm={6} lg={6} md={6}>
            <Box className="userProfile">
              <figure className="user">
                <img src="images/Creators/CreatorProfile.png" />
                <IconButton
                  style={{ backgroundColor: "#FFF" }}
                  className="editprofile"
                  onClick={() => history.push("/settings")}
                >
                  <GrEdit />
                </IconButton>
              </figure>
            </Box>
            <Box className="username">
              <Typography color="primary.main" variant="h3">
                Suraj Gupta
              </Typography>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">
                  0x3c4...50923sfahksfs4521221545{" "}
                </Typography>
                <FaCopy />
              </Box>
              <Typography variant="h6">Total Subscriber 1</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={6} md={6} align="right">
            <Box className="buttonbox">
              <Button
                variant="contained"
                color="secondary"
                // size="large"
                // onClick={() => setDeposit(true)}
                style={{ marginRight: "8px" }}
              >
                Deposit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginLeft: "8px" }}
                // size="large"
                // onClick={() => setWithdraw(true)}
              >
                Withdraw
              </Button>
            </Box>
          </Grid>
        </Grid> */}
      <Box className={classes.main}>
        <Box className="content">
          <Box className="heading">
            <Typography variant="h4" color="primary.main">
              All Transactions
            </Typography>
          </Box>
          {isLoading ? (
            <DataLoading />
          ) : (
            <TableContainer>
              <Table>
                <TableHead component={Paper} className="headingcell">
                  <TableRow>
                    <TableCell align="Center" className={classes.cell}>
                      Sr.No
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Payment Date
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Coin Name
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Transaction Type
                    </TableCell>

                    <TableCell align="Center" className={classes.cell}>
                      Status
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                {transactionListData?.map((data, i) => {
                  return (
                    <TableBody key={i}>
                      <TableRow className={classes.tbody}>
                        <TableCell align="Center" component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="Center">
                          {moment(data?.createdAt).format("DD:MM:YYYY hh:mm A")}
                        </TableCell>
                        <TableCell align="Center">ETH</TableCell>
                        <TableCell align="Center">
                          {data?.transactionType}
                        </TableCell>
                        <TableCell align="Center">
                          {data?.transactionStatus}
                        </TableCell>
                        <TableCell align="Center">
                          {data?.amount}&nbsp;
                          {tokenName}
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

          {transactionListData && transactionListData.length >=10 && (
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
      {/* </Paper> */}
    </>
  );
}

export default TransactionHistory;
