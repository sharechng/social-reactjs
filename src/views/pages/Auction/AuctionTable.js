import React, { useState, useEffect } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Tooltip } from "@material-ui/core";
import NoDataFound from "src/component/NoDataFound";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  LoginBox: {
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
    },
  },
  table: {
    width: "100%",
    minWidth: "900px",
    //  border: "1px solid white",
    "& th": {
      border: "1px solid #474646",
      padding: "10px !important",
    },
    "& td": {
      border: "1px solid #474646",
      padding: "10px !important",
    },
  },
  Paper: {
    boxShadow: "none",
    borderRadius: "2rem",
    backgroundColor: "#373636",
    paddingBottom: "2rem",
  },
  MainRectangle: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
  Rectangle: {
    width: "27.5px",
    height: "27.5px",
    border: "solid 0.5px #d15b5b",
    backgroundColor: "#373636",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    padding: "5px",
    margin: "10px",
    float: "right",
  },
  Pageno: {
    display: "flex",
    margin: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  iconimg: {
    padding: "7px",
    background: "#1E6D74",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    marginTop: "9px",
    "& svg": {
      fontSize: "17px",
      color: "#0DD0FF",
    },
    "&:hover": {
      background: "#014046",
    },
  },
  tbody: {
    color: "white",
    alignItems: "center",
    fontSize: "16px",
  },
  cell: {
    fontSize: "1.2rem",
    fontSize: "20px",
  },
}));

export default function AuctionTable(props) {
  const classes = useStyles();
  const { auctionNFTDetails } = props;
  return (
    <Box className={classes.LoginBox}>
      <Box>
        <TableContainer className={classes.Paper} component={Paper}>
          <Box mt={1.5} mb={1.5} ml={5}>
            <Typography variant="h5">History</Typography>
          </Box>
          {auctionNFTDetails?.bidId?.length > 0 ? (
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="Center" className={classes.cell}>
                    Bid Amount
                  </TableCell>
                  <TableCell align="Center" className={classes.cell}>
                    Date
                  </TableCell>
                  <TableCell align="Center" className={classes.cell}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              <>
                {auctionNFTDetails &&
                  auctionNFTDetails?.bidId?.map((data, i) => {
                    return (
                      <>
                        <TableBody key={i}>
                          <TableRow className={classes.tbody}>
                            <TableCell
                              align="Center"
                              component="th"
                              scope="row"
                              style={{ fontSize: "14px" }}
                            >
                              {" "}
                              {data?.amountBid}
                            </TableCell>
                            <TableCell
                              align="Center"
                              style={{ fontSize: "14px" }}
                            >
                              {" "}
                              {moment(data?.createdAt).format("MM/DD/YYYY")}
                              {/* {data?.createdAt} */}
                            </TableCell>
                            <TableCell
                              align="Center"
                              style={{ fontSize: "14px" }}
                            >
                              {" "}
                              {data?.bidStatus}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </>
                    );
                  })}
              </>
            </Table>
          ) : (
            <NoDataFound />
          )}
        </TableContainer>
      </Box>
    </Box>
  );
}
