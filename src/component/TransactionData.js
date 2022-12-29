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
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { sortAddress } from "src/utils";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { FaCopy } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDownload } from "react-icons/ai";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NoDataFound from "src/component/NoDataFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import Axios from "axios";
import * as XLSX from "xlsx";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import moment from "moment";
import { tokenName } from "src/utils";
import { KeyboardDatePicker } from "@material-ui/pickers";

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
    padding: "0px 5px 0px 5px",
    "& .content": {
      backgroundColor: "#101010",
      // width: "100%",
      padding: "0px 5px 0px 5px",
      "& .heading": {
        paddingBottom: "15px",
      },
    },
  },
  cell: {
    fontSize: "16px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
}));
const currenciesUser = [
  {
    value: "DEPOSIT_FOR_ADMIN",
    label: "DEPOSIT",
  },
  {
    value: "WITHDRAW_FOR_ADMIN",
    label: "WITHDRAW",
  },
];
function TransactionHistory({ data, index }) {
  const classes = useStyles();
  const [transactionListData, setTransactionList] = useState([]);
  const [transactionListDataDownload, setTransactionListDownload] = useState(
    []
  );
  // console.log();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [typeactivty, setTypeactivty] = useState("All");
  const [searchUserName, setSearchUserName] = useState("");
  console.log(
    "transactionListDataDownload",
    transactionListDataDownload,
    transactionListData
  );
  //   const [loading, setLoading] = useState(false);
  //   const [page, setPage] = useState(1);
  //   const [noOfPages, setNoOfPages] = useState(1);
  const transactionhistory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.walletTransactionList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          limit: 10,
          page: page,
          fromDate: timeFilter ? `${moment(timeFilter)}` : null,
          toDate: toTimeFilter ? `${moment(toTimeFilter)}` : null,
          transactionType: typeactivty === "All" ? null : typeactivty,
        },
      });
      if (res.data.responseCode === 200) {
        setTransactionList(res.data.result.docs);
        setTransactionListDownload(
          res.data.result.docs.map((data, i) => {
            return {
              Sno: i + 1,
              Paymentdate: data?.createdAt,
              Coinname: "ETH",
              Amount: data?.amount,
              Transactiontype: data?.transactionType,
              Transactionstatus: data?.transactionStatus,
            };
          })
        );
        setNoOfPages(res.data.result.pages);
        setIsClear(false);
      }
      setIsClear(false);

      setIsLoading(false);
    } catch (error) {
      setIsClear(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    transactionhistory();
  }, [isClear, page]);
  const clearHandler = () => {
    transactionhistory();
    setTimeFilter();
    setToTimeFilter();
    setTypeactivty("All");
    setIsClear(true);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(transactionListDataDownload);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "transaction-list");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "user_list.xlsx");
  };

  // useEffect(()=>{
  //   if(typeactivty)
  // },[])
  return (
    <>
      <Box className={classes.main}>
        <Box align="right">
          {transactionListDataDownload &&
            transactionListDataDownload?.length > 0 && (
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
        </Box>
        <Box className="content">
          <Box mt={4} mb={4}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  variant="boay2"
                  style={{ color: "#cfc8c8" }}
                // color="primary.main"
                >
                  From Date:
                </Typography>
                <Box mt={1}>
                  <KeyboardDatePicker
                    value={timeFilter}
                    onChange={(date) => {
                      setTimeFilter(new Date(date));
                    }}
                    // maxDate={toTimeFilter ? toTimeFilter : ""}
                    format="DD/MM/YYYY"
                    // inputVariant="outlined"
                    disableFuture
                    margin="dense"
                    variant="outlined"
                    helperText=""
                    name="dob"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  variant="boay2"
                  style={{ color: "#cfc8c8" }}
                // color="primary.main"
                >
                  To Date:
                </Typography>
                <Box mt={1}>
                  <KeyboardDatePicker
                    variant="outlined"
                    value={toTimeFilter}
                    onChange={(date) => {
                      setToTimeFilter(new Date(date));
                    }}
                    minDate={timeFilter}
                    //   maxDate={moment(toTimeFilter).format("YYYY-MM-DDThh:mm")}
                    format="DD/MM/YYYY"
                    // inputVariant="outlined"
                    disableFuture
                    margin="dense"
                    helperText=""
                    name="dob"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  variant="boay2"
                  style={{ color: "#cfc8c8", marginTop: "-2px" }}
                // color="primary.main"
                >
                  By Type:
                </Typography>
                <Box style={{ marginTop: "5px" }}>
                  <FormControl fullWidth>
                    <Select
                      style={{ maxHeight: "48px", marginTop: "-1px" }}
                      labelId="demo-select-small"
                      id="demo-select-small"
                      //   value={age}
                      //   variant="outlined"
                      onChange={(e) => setTypeactivty(e.target.value)}
                      value={typeactivty}
                    >
                      <MenuItem disableScrollLock={true} value={"All"}>
                        All
                      </MenuItem>
                      {currenciesUser.map((option, i) => (
                        <MenuItem
                          disableScrollLock={true}
                          key={i}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    onClick={transactionhistory}
                    color="secondary"
                    size="large"
                    style={{ marginRight: "8px" }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={clearHandler}
                    color="secondary"
                    size="large"
                    style={{ marginLeft: "8px" }}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          &nbsp;
          {isLoading ? (
            <DataLoading />
          ) : (
            <TableContainer>
              <Table style={{width:"100% !important"}}>
                <TableHead component={Paper} className="headingcell">
                  <TableRow>
                    <TableCell align="Center" className={classes.cell}>
                      Sr.No.
                    </TableCell>
                    {/* <TableCell align="Center" className={classes.cell}>
                      Payment Date
                    </TableCell> */}

                    {/* <TableCell align="Center" className={classes.cell}>
                      Transaction Type
                    </TableCell> */}
                    <TableCell align="Center" className={classes.cell}>
                      To Address
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      From Address
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Amount
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Trx Fee
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Date and Time
                    </TableCell>
                    <TableCell align="Center" className={classes.cell}>
                      Status
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
                          {sortAddress(data?.toAddress)}
                        </TableCell>
                        <TableCell align="Center">
                          {sortAddress(data?.fromAddress)}
                        </TableCell>

                        <TableCell align="Center">
                          {data?.amount}&nbsp;
                          {tokenName}
                        </TableCell>
                        <TableCell align="Center">
                          {data?.commission}
                        </TableCell>
                        <TableCell align="Center">
                          {moment(data?.createdAt).format("DD:MM:YYYY hh:mm A")}
                        </TableCell>
                        <TableCell align="Center">
                          {data?.transactionStatus}
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
          {transactionListData && transactionListData.length >= 10 && (
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
