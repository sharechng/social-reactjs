import React, { useState, useEffect, useContext } from "react";
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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { FaCopy } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import * as XLSX from "xlsx";
import { AiOutlineDownload } from "react-icons/ai";
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
import { KeyboardDatePicker } from "@material-ui/pickers";
import Page from "../../../component/Page";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    "& .content": {
      backgroundColor: "#101010",
      borderRadius: "15px",
      // width: "100%",
      padding: "15px",
      "& .heading": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 0px 30px",
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
    value: "BUY_AUCTION",
    label: "Buy Auction",
  },
  {
    value: "SOLD_AUCTION",
    label: "Sold Auction",
  },
  {
    value: "BUY_POST",
    label: "Buy Post",
  },
  {
    value: "SOLD_POST",
    label: "Sold Post",
  },
  {
    value: "COLLECTION_SHARE_AMOUNT",
    label: "Collection Share Amount",
  },
  {
    value: "COLLECTION_RECEIVE_AMOUNT",
    label: "Collection Receive Amount",
  },
  {
    value: "COLLECTION_SUBSCRIBE_RECEIVE",
    label: "Collection Subscribe Recieved",
  },
];

function TransactionHistory({ data, index }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [transactionListData, setTransactionList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isClear, setIsClear] = useState(false);
  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [typeactivty, setTypeactivty] = useState("All");
  const [transactionListDataDownload, setTransactionListDownload] = useState(
    []
  );
  // console.log("transactionListDataDownload", transactionListDataDownload);
  const transactionhistory = async () => {
    try {
      // setIsLoading(true);
      const res = await Axios({
        method: "GET",
        url: auth?.userData?.userType === "Admin" ? Apiconfigs.adminTransactionList : Apiconfigs.transactionList,
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
        setIsClear(false);
        setTransactionList(res.data.result.docs);
        setTransactionListDownload(
          res.data.result.docs.map((data, i) => {
            return {
              Sno: i + 1,
              Paymentdate: moment(data?.createdAt).format("lll"),
              Coinname: "BNB",
              Token: data?.amount,
              Transactiontype: data?.transactionType,
              Transactionstatus: data?.transactionStatus,
            };
          })
        );

        setNoOfPages(res.data.result.pages);
      }
      setIsClear(false);
      setIsLoading(false);
    } catch (error) {
      setIsClear(false);
      setTransactionList([]);
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
    XLSX.writeFile(workBook, "transaction_list.xlsx");
  };

  return (
    <>
      <Page title="Transaction History ">
        <Paper className={classes.root}>
          <Box className="content">
            <Box className="heading">
              <Typography variant="h3">All Transactions</Typography>
              {transactionListData && transactionListData?.length > 0 && (
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
            <Box mb={3}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Typography
                    variant="boay2"
                    style={{ color: "#cfc8c8" }}
                  // color="primary.main"
                  >
                    From
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
                    To
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
                  <Typography variant="body2" style={{ color: "#cfc8c8" }}>
                    By Type
                  </Typography>
                  <Box style={{ marginTop: "5px" }}>
                    <FormControl fullWidth>
                      <Select
                        style={{ maxHeight: "48px", marginTop: "-1px" }}
                        labelId="demo-select-small"
                        id="demo-select-small"
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
                    {/* <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={downloadExcel}
                      style={{ marginLeft: "8px" }}
                    >
                      Download CSV
                    </Button> */}
                  </Box>
                </Grid>
              </Grid>
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
                      {auth?.userData?.userType !== "Admin" &&
                        <TableCell align="Center" className={classes.cell}>
                          Commission
                        </TableCell>
                      }

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
                            {moment(data?.createdAt).format(
                              "DD:MM:YYYY hh:mm A"
                            )}
                          </TableCell>
                          {auth?.userData?.userType !== "Admin" &&
                            <TableCell align="Center">{`${data?.commission ? data?.commission : 0} Share`}</TableCell>

                          }
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

            {/* {transactionListData && transactionListData.length >=10 && ( */}
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={noOfPages}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            </Box>
            {/* )} */}
          </Box>
        </Paper>
      </Page>
    </>
  );
}

export default TransactionHistory;
